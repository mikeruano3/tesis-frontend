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
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LocalFileReference } from './files/files-handler.component';

export interface newPostProps{
  newPostCategoryId:string
  newPostClasification:string
  newPostUniversity:string
  postData:PostSchema
}

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.page.html',
  styleUrls: ['./post-editor.page.scss'],
})
export class PostEditorPage implements OnInit {
  public Editor = ClassicEditor;
  config
  user:UserSchema = null
  uploadedFilesHandler:UploadedFilesHandler = { uploadedFilesShowToUser: [] }
  localStorageRefName:string = null
  isEditingPost:boolean = false
  postData:PostSchema = {} as PostSchema

  constructor(
    private postsService: PostsService,
    public tokenStorageService: TokenStorageService,
    private route: ActivatedRoute, private router: Router,
    public alertController: AlertController, private navCtrl:NavController,
    private storage: Storage, private loadingController: LoadingController
  ) { 
    this.config = {} //{uiColor: '#99000'};
    this.route.queryParams.subscribe(params => {
      let navigationState = this.router.getCurrentNavigation().extras.state
      if (navigationState) 
      {
        if(navigationState.postData){
          this.fillPostFromData(navigationState.postData)
        }else{
         this.initNewPost(navigationState)
        }
      }
    })
  }

  ngOnInit() { 
    this.getUserData()
  }

  async getUserData(){
    this.user = await this.tokenStorageService.getUserSchema()
  }

  async initNewPost(navigationState){
    this.isEditingPost = false
    this.postData.title = ''
    this.postData.content = ''
    this.postData.postCategory = navigationState.newPostCategoryId,
    this.postData.postClasification = navigationState.newPostClasification,
    this.postData.university = navigationState.newPostUniversity
    this.localStorageRefName = 'newPostHolder'
  }

  async fillPostFromData(post:PostSchema){
    this.isEditingPost = true
    this.postData = post
    for (let i = 0; i < post.files.length; i++) {
      this.uploadedFilesHandler.uploadedFilesShowToUser.push((post.files[i] as any) as FileSchema)  
    }
    // ESTO TIENE QUE IR DE ULTIMO SIEMPRE
    this.localStorageRefName = 'editingPostHolder'
  }

  async savePostTasks(){
    try {
      if(!this.checkFields()){ return }
      this.presentLoading()
      let uploadedFilesIds = await this.uploadFilesToPostSchema()
      await this.savePostToServer(uploadedFilesIds)
      this.dismissLoading()
      this.goBack()
      //document.getElementById('ionback-button').click()
    } catch (ex) {
      console.log(ex);
      this.presentAlert('ERROR', 'No se pudo publicar', 'Por favor intente de nuevo '+ex.message)
    }
  }

  async uploadFilesToPostSchema():Promise<string[]>{
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

    return uploadedFiles
  }

  checkFields(){
    if (!this.postData.title || this.postData.title == '') {
      this.presentAlert('Alerta', 'No existe título', 'Por favor escriba un título')
      return false
    }
    if (!this.postData.content || this.postData.content == '') {
      this.presentAlert('Alerta', 'No existe contenido', 'Por favor escriba el contenido')
      return false
    }
    return true
  }

  async savePostToServer(uploadedFilesIds: string[]){
    this.postData.user = this.user
    this.postData.files = uploadedFilesIds
    this.postData.childComments = []
    this.postData.postAsComment = {
      parentCommentOrPost: undefined,
      mentionedUser: undefined
    }
    let resPost
    if(!this.isEditingPost){
      resPost = await this.postsService.saveOne(APPCONSTANTS.SCHEMAS.POSTS_SCHEMA, this.postData).toPromise()
    }else{
      resPost = await this.updatePostToServer(this.postData)
    }
    if(resPost){
      console.log(resPost);
      this.postData = { title:'', content: '' } as PostSchema
      if(!this.isEditingPost){
        await this.borrarLocalFiles()
      }
    }else{
      this.presentAlert('ERROR', 'No se pudo publicar', 'Por favor intente de nuevo')
    }
  }

  async updatePostToServer(data: PostSchema) {
    let updateData = {
      query: {
        _id: data._id
      },
      data: data
    }
    return await this.postsService.updateOne(APPCONSTANTS.SCHEMAS.POSTS_SCHEMA, updateData).toPromise()
  }

  async borrarLocalFiles(){
    this.uploadedFilesHandler.uploadedFilesShowToUser = []
    let newLocal = {files : []} as LocalFileReference
    this.storage.set(this.localStorageRefName, newLocal)
  }

  async presentAlert(header:string, subHeader:string, message:string) {
    const alert = await this.alertController.create({
      //cssClass: 'my-custom-class',
      header: header,
      subHeader: subHeader,
      message: message,
      mode: 'ios',
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class', message: 'Por favor espere...', duration: 5000, mode: 'ios'
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }
  async dismissLoading(){
    await this.loadingController.dismiss()
  }

  goBack(){
    if(this.isEditingPost){
      this.navCtrl.pop()
    }else{
      this.navCtrl.pop()
    }
  }

}
