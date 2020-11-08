import { PostSchema } from '../../schemas/post';
import { PostsService } from '../post.service';
import { UserSchema } from 'src/app/schemas/user';
import { TokenStorageService } from '../../auth/token-storage.service';
import { Injectable } from '@angular/core';
import { APPCONSTANTS } from '../../constants/app-constants';
import { ActionSheetController, AlertController, LoadingController, NavController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { FileSchema } from 'src/app/schemas/fileSchema';

@Injectable({
  providedIn: 'root'
})

export class PostHandlerService {
  
  constructor(
    private postsService: PostsService,
    private navCtrl:NavController,
    private tokenStorageService: TokenStorageService,
    private actionSheetController: ActionSheetController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router
  ) { }

  async presentActionSheet(post: PostSchema) {
    let buttons

    let deleteButton = {
      text: 'Borrar', role: 'destructive', icon: 'trash',
      handler: () => {
        this.presentAlertConfirm('DELETE', post)
      }
    }
    let editButton = {
      text: 'Editar', icon: 'create',
      handler: () => {
        this.editPost(post)
      }
    }
    let cancelButton = {
      text: 'Cancelar', icon: 'close', role: 'cancel',
      handler: () => {}
    }
    let reportButton = {
      text: 'Reportar', icon: 'megaphone',
      handler: () => {
        console.log('Report clicked');
      }
    }
    
    let loggedInUser = await this.tokenStorageService.getUserSchema()
    // primero verificar si el post tiene usuario para que si sale null, no lo pueda editar cualquier anonimo
    // post?.user?._id && 
    if( loggedInUser?._id == post?.user?._id) 
    { buttons = [editButton, deleteButton, cancelButton] } else { buttons = [reportButton, cancelButton] }

    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      cssClass: 'my-custom-class',
      buttons: buttons
    });
    await actionSheet.present();
  }

  async deletePost(post:PostSchema){
    this.presentLoading()
    for (let i = 0; i < post.files.length; i++) {
      if(typeof post.files[i] == "string"){
        let data = await this.postsService.deleteOne(APPCONSTANTS.SCHEMAS.FILES_SCHEMA, post.files[i]).toPromise()
      }else if(((post.files[i]) as any)._id){
        let data = await this.postsService.deleteOne(APPCONSTANTS.SCHEMAS.FILES_SCHEMA, ((post.files[i]) as any)._id).toPromise()
      }
    }
    await this.postsService.deleteOne(APPCONSTANTS.SCHEMAS.POSTS_SCHEMA, post._id).toPromise()
    this.dismissLoading()
  }

  editPost(post: PostSchema){
    let navigationExtras: NavigationExtras = {
      state: {
        postData: post
      }
    };
    this.router.navigate(['/post-editor'], navigationExtras);
  }

  /*** COMMONS */

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

  async presentAlertConfirm(action:string, post: PostSchema) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmación',
      message: '¿Desea borrar la publicación?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {}
        }, {
          text: 'Confirmar',
          handler: () => {
            if(post._id && post._id != '' && action == 'DELETE'){
              this.deletePost(post)
              this.goback()
            }
          }
        }
      ]
    });
    await alert.present();
  }

  goback() {
    this.navCtrl.pop();
  }

}