import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { PostsService } from '../post.service';
import { TokenStorageService } from '../../auth/token-storage.service';
import { PostSchema } from '../../schemas/post';
import { UserSchema } from '../../schemas/user';
import { APPCONSTANTS } from '../../constants/app-constants';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploadService } from '../../file-upload/drive-upload.service';
import { localFileData } from './files/local-file-data.interface';
import { UploadedFilesHandler } from './files/uploaded-file-transferer.interface';
import { FileSchema } from 'src/app/schemas/fileSchema';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LocalFileReference } from './files/files-handler.component';

export interface newPostProps{
  newPostCategoryId:string
  newPostClasification:string
  newPostUniversity:string
}

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.page.html',
  styleUrls: ['./post-editor.page.scss'],
})
export class PostEditorPage implements OnInit {
  public Editor = ClassicEditor;
  editorData:any = ''
  titleData:string = ''
  config
  user:UserSchema
  newPostCategoryId:string = null
  newPostClasification:string = null
  newPostUniversity:string = null
  uploadedFilesHandler:UploadedFilesHandler = { uploadedFilesShowToUser: [] }
  localStorageRefName:string = 'newPostHolder'

  constructor(
    private postsService: PostsService,
    public tokenStorageService: TokenStorageService,
    private route: ActivatedRoute, private router: Router,
    public alertController: AlertController,
    private storage: Storage
  ) { 
    this.config = {} //{uiColor: '#99000'};
    this.route.queryParams.subscribe(params => {
      let navigationState = this.router.getCurrentNavigation().extras.state
      if (navigationState) 
      {
        this.newPostCategoryId = navigationState.newPostCategoryId,
        this.newPostClasification = navigationState.newPostClasification,
        this.newPostUniversity = navigationState.newPostUniversity
      }
    });
  }

  ngOnInit() { 
    this.user = this.tokenStorageService.getUserData()
  }

  async savePostTasks(){
    try {
      if (this.titleData == '') {
        this.presentAlert('Alerta', 'No existe título', 'Por favor escriba un título')
        return
      }
      if (this.editorData == '') {
        this.presentAlert('Alerta', 'No existe contenido', 'Por favor escriba el contenido')
        return
      }
      /*** SAVE FILES */
      let uploadedFiles: string[] = []
      for (let index = 0; index < this.uploadedFilesHandler.uploadedFilesShowToUser.length; index++) {
        const element = this.uploadedFilesHandler.uploadedFilesShowToUser[index];
        if (element._id != "" && element._id != undefined) {
          uploadedFiles.push(element._id)
          continue;
        }
        let result = await this.postsService.saveOne(APPCONSTANTS.SCHEMAS.FILES_SCHEMA, element).toPromise()
        if (result._id) {
          this.uploadedFilesHandler.uploadedFilesShowToUser[index]._id = result._id
          uploadedFiles.push(result._id)
        }
      }
      // guardando las referencias al local storage para no volver a subirlas si hay ERRROR
      let newLocal = {files : this.uploadedFilesHandler.uploadedFilesShowToUser} as LocalFileReference
      this.storage.set(this.localStorageRefName, newLocal).catch(err=>{ console.log(err);})

      // finalmente publicar
      await this.savePostToServer(uploadedFiles)
      console.log('saved!!!');
      document.getElementById('ionback-button').click()
    } catch (ex) {
      console.log(ex);
      this.presentAlert('ERROR', 'No se pudo publicar', 'Por favor intente de nuevo '+ex.message)
    }
  }

  async savePostToServer(files: string[]){
    const tmpContent = this.editorData
    let newPost:PostSchema = {} as PostSchema
    newPost.user = this.getLoggedInUserData()
    newPost.postCategory = this.newPostCategoryId
    newPost.postClasification = this.newPostClasification
    newPost.university = this.newPostUniversity
    newPost.title = this.titleData
    newPost.content = tmpContent
    newPost.files = files
    newPost.childComments = [];
    newPost.postAsComment = {
      parentCommentOrPost: undefined,
      mentionedUser: undefined
    }
    let resPost = await this.postsService.saveOne(APPCONSTANTS.SCHEMAS.POSTS_SCHEMA, newPost).toPromise()
    if(resPost){
      console.log(resPost);
      this.editorData = null
      this.titleData = ''
      await this.borrarLocalFiles()
    }else{
      this.presentAlert('ERROR', 'No se pudo publicar', 'Por favor intente de nuevo')
    }
  }

  async borrarLocalFiles(){
    this.uploadedFilesHandler.uploadedFilesShowToUser = []
    let newLocal = {files : []} as LocalFileReference
    this.storage.set(this.localStorageRefName, newLocal)
  }

  getLoggedInUserData(){
    return undefined
  }

  async presentAlert(header:string, subHeader:string, message:string) {
    const alert = await this.alertController.create({
      //cssClass: 'my-custom-class',
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

}
