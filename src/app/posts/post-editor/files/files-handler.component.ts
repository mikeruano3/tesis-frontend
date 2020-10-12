import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { AlertController } from '@ionic/angular';
import { getPlatforms } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { localFileData } from './local-file-data.interface';
import { UploadedFilesHandler } from './uploaded-file-transferer.interface';

export interface LocalFileReference{
  files: localFileData[]
}

@Component({
  selector: 'app-files-handler',
  templateUrl: './files-handler.component.html',
  styleUrls: ['./files-handler.component.scss']
})

export class FilesHandlerComponent implements OnInit {
  @Input() public localStorageRefName: string;
  @Input() public uploadFolderName: string;
  singleFile: File;
  @Input() public uploadedFilesHandler : UploadedFilesHandler

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;

  slideOpts = {
    initialSlide: 1,
    slidesPerView: 3,
    spaceBetween: 0.5,
    freeMode: true,
    navigation: true,
    watchSlidesProgress: true,
    //slidesOffsetAfter: 100,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  }

  constructor(
    private afStorage: AngularFireStorage, 
    public alertController: AlertController,
    private fileChooser: FileChooser,
    private storage: Storage) { }

  ngOnInit(): void {
    this.checkLocalStorageOrCreate(this.localStorageRefName).then( 
      data=>{
        this.uploadedFilesHandler.uploadedFilesShowToUser = data.files
      }
    )
  }

  async uploadFileToFirebase() {
    try{
      const id = Math.random().toString(36).substring(2);
      this.ref = this.afStorage.ref(`${this.uploadFolderName}/${id}`);
      this.task = this.ref.put(this.singleFile)
      this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
      this.uploadProgress = this.task.percentageChanges();
      await this.task    
      this.downloadURL = this.ref.getDownloadURL()
      let linkString = await this.downloadURL.toPromise()
      this.clearIndicators() // DO NOT CLEAR FILE JUST YET
      await this.saveMetadataToLocal(id, this.uploadFolderName, linkString, this.singleFile?.name, this.singleFile?.type)
    }catch(ex){
      console.log(ex);
      this.clearIndicators()
    }
  }

  async saveMetadataToLocal(id:any, uploadFolderName:any, downloadUrl:string, fileName:string, fileType:string) {
    const objectNameToSaveOnLocal:string = this.localStorageRefName
    const newFileMetadata:localFileData = {
      firestoreId: id, firestoreFolder: uploadFolderName, firestoreDownloadLink: downloadUrl,
      fileName: fileName, fileType: fileType,
    } as localFileData

    let localFiles:LocalFileReference = await this.checkLocalStorageOrCreate(objectNameToSaveOnLocal)
    if(!!localFiles.files){
      localFiles.files.push(newFileMetadata)
      this.storage.set(objectNameToSaveOnLocal, localFiles).catch(err=>{
        this.presentAlert('Ha habido un error con el archivo!', 'No se puede subir el archivo, intente de nuevo!')  
      }).then(data => {
        this.uploadedFilesHandler.uploadedFilesShowToUser = localFiles.files
      });
    }else{
      this.presentAlert('Ha habido un error con el archivo!', 'No se puede subir el archivo, intente de nuevo!')
    }
    this.clearFile()
  }

  async checkLocalStorageOrCreate(localStorageVarName:string): Promise<LocalFileReference>{
    let localRef = await this.storage.get(localStorageVarName)
    if(!!! localRef){
      console.log('Re-setting storage for '+localStorageVarName);
      let newLocal = {files : []} as LocalFileReference
      this.storage.set(localStorageVarName, newLocal);
    }
    return localRef
  }

  handleFileInput(event) {
    this.singleFile = event.target.files[0]
    this.checkSize()
  }

  checkSize(){
    if(!this.singleFile){
      return
    }
    //console.log(this.singleFile);
    if(this.singleFile.size > 50000000){
      this.presentAlert('El archivo es muy grande!', 'Tamaño máximo de archivos: 50 MB')
      this.clearFile()
      this.clearIndicators()
      return
    }
  }

  clearFile(){
    this.singleFile = undefined
  }

  clearIndicators(){
    this.uploadState = undefined
    this.uploadProgress = undefined
  }

  checkCordoba(){
    return (getPlatforms().includes("cordova"))
  }

  async presentAlert(subHeader:string, message:string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
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

  async chooseFile(){
    //console.log(getPlatforms());
    let result = await this.fileChooser.open().catch(
      err => { console.log(err) } 
    ).then(
      uri => {
        //this.presentAlert(uri) 
      }
    )
    //this.presentAlert(result)
  }

  clickUpload(){
    document.getElementById('file1').click()
  }
  
  openBrowserLinks(link:string){
    window.open(link, '_system', 'location=yes'); return false;
  }

  async deleteFileFromFirebase(fileMetadata:localFileData, indexToDelete: number){
    let storageRef = this.afStorage.storage.ref()
    fileMetadata['isCurrentlyDeleting'] = true
    var fileRef = storageRef.child(`${fileMetadata.firestoreFolder}/${fileMetadata.firestoreId}`);
    // Delete the file
    let result = await fileRef.delete().then(data=>{
      this.deleteFileFromLocalStorage(indexToDelete)
      this.presentAlert('ARCHIVO BORRADO!', 'Se ha borrado el archivo!')
      fileMetadata['isCurrentlyDeleting'] = undefined
    }).catch( err =>{
      this.presentAlert('ARCHIVO NO BORRADO!', 'Por favor intente de nuevo!')
      fileMetadata['isCurrentlyDeleting'] = undefined
    })    
  }

  async tryDelete(fileMetadata:localFileData){
    let index = this.uploadedFilesHandler.
      uploadedFilesShowToUser.map(function(x) {return x.firestoreId; }).indexOf(fileMetadata.firestoreId)
    if (index > -1) {
      this.deleteFileFromFirebase(fileMetadata, index)
    }
  }

  async deleteFileFromLocalStorage(index:number){
    this.uploadedFilesHandler.uploadedFilesShowToUser.splice(index, 1);
    let newLocal = {files : this.uploadedFilesHandler.uploadedFilesShowToUser} as LocalFileReference
    this.storage.set(this.localStorageRefName, newLocal);
  }
}
