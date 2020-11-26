import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { localFileData } from '../../posts/post-editor/files/local-file-data.interface';

@Component({
    selector: 'app-image-cropper',
    templateUrl: './image-cropper.html',
    styleUrls: ['./image-cropper.scss'],
})
export class ImageCropComponent implements OnInit {
    @Input() public uploadFolderName: string;
    @Input() public uploadedFileHandler : any
    @Input() public uploadedPropertyName : string
    @Input() public aspectRatio: number = 450/250;
    @Output() onSaveParentPost = new EventEmitter<any>()

    imageFile: any = null
    croppedImage = null
    @ViewChild(ImageCropperComponent, { static: false }) angularCropper: ImageCropperComponent

    /*** FIREBASE */
    ref: AngularFireStorageReference;
    task: AngularFireUploadTask;
    uploadState: Observable<string>;
    uploadProgress: Observable<number>;
    downloadURL: Observable<string>;
    /************ */

    constructor(
        private afStorage: AngularFireStorage, 
        public alertController: AlertController,
        private fileChooser: FileChooser,
        private storage: Storage) { }

    ngOnInit() {
    }

    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
    }

    /******* UPLOAD FILE **********/
    handleFileInput(event) {
        this.imageFile = event.target.files[0]
        this.checkSize()
    }

    clickUpload(){
        document.getElementById('file1').click()
    }

    checkSize() {
        if (!this.imageFile) {
            return
        }
        if (this.imageFile.size > 500000) {
            this.presentAlert('El archivo es muy grande!', 'Tamaño máximo de archivos: 500 KB')
            this.imageFile = undefined
            this.clearIndicators()
            return
        }
    }

    clearIndicators() {
        this.croppedImage = null
        this.uploadState = undefined
        this.uploadProgress = undefined
    }

    async presentAlert(subHeader: string, message: string) {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Alerta',
            subHeader: subHeader,
            message: message,
            mode: 'ios',
            buttons: ['OK']
        });
        await alert.present();
    }

    /********* FIREBASE *********** */

    async uploadFileToFirebase() {
        try{
          const id = Math.random().toString(36).substring(2);
          this.ref = this.afStorage.ref(`${this.uploadFolderName}/${id}`);
          this.task = this.ref.putString(this.croppedImage, 'data_url')
          this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
          this.uploadProgress = this.task.percentageChanges();
          await this.task    
          this.downloadURL = this.ref.getDownloadURL()
          let linkString = await this.downloadURL.toPromise()
          this.clearIndicators() // DO NOT CLEAR FILE JUST YET
          await this.saveMetadataToLocal(id, this.uploadFolderName, linkString, this.imageFile?.name, this.imageFile?.type)
        }catch(ex){
          console.log(ex);
          this.clearIndicators()
        }
    }

    async saveMetadataToLocal(id:any, uploadFolderName:any, downloadUrl:string, fileName:string, fileType:string) {
        const newFileMetadata:localFileData = {
          firestoreId: id, firestoreFolder: uploadFolderName, firestoreDownloadLink: downloadUrl,
          fileName: fileName, fileType: fileType,
        } as localFileData
        this.uploadedFileHandler[this.uploadedPropertyName] = newFileMetadata
        this.onSaveParentPost.emit(newFileMetadata)
    }

    async deleteFileFromFirebase(fileMetadata:localFileData){
        let storageRef = this.afStorage.storage.ref()
        fileMetadata['isCurrentlyDeleting'] = true
        var fileRef = storageRef.child(`${fileMetadata.firestoreFolder}/${fileMetadata.firestoreId}`);
        // Delete the file
        let result = await fileRef.delete().then(data=>{
          this.presentAlert('ARCHIVO BORRADO!', 'Se ha borrado el archivo!')
          fileMetadata['isCurrentlyDeleting'] = undefined
          this.deleteFileFromLocal()
        }).catch( err =>{
            if(err?.code == 'storage/object-not-found'){
                this.deleteFileFromLocal()
            }else{
                this.presentAlert('ARCHIVO NO BORRADO!', 'Por favor intente de nuevo!')
            }
          fileMetadata['isCurrentlyDeleting'] = undefined
        })    
    }

    async deleteFileFromLocal(){
        this.uploadedFileHandler[this.uploadedPropertyName] = null
        this.onSaveParentPost.emit(null)
    }
    
    openBrowserLinks(link:string){
        window.open(link, '_system', 'location=yes'); return false;
    }

    cancelUpload(){
        try {
          this.task.cancel() 
          this.clearIndicators() 
        } catch (error) {
          console.log(error);
          this.clearIndicators() 
        }
      }

    move(x, y) {
        this.angularCropper.cropper.x1 += x
        this.angularCropper.cropper.x2 += x
        this.angularCropper.cropper.y1 += y
        this.angularCropper.cropper.y2 += y
    }

}
