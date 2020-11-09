import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-web-fill-password',
  templateUrl: './web-fill-password.page.html',
  styleUrls: ['./web-fill-password.page.scss'],
})
export class WebFillPasswordPage implements OnInit {
  id:string
  passwordForm: FormGroup
  
  constructor(private actRoute: ActivatedRoute, 
      private loadingController: LoadingController,
      public alertController: AlertController,
      private authService: AuthService,
      public fb: FormBuilder) { 
        this.id = this.actRoute.snapshot.paramMap.get('id')
        this.passwordForm = this.fb.group({
          password: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
          confirm: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
        })
  }

  ngOnInit() {
  }

  async sendEmailData(event){
    if(!this.passwordForm.valid || !this.id){
      return
    }
    if(this.passwordForm.value.password != this.passwordForm.value.confirm){
      this.presentAlert('Error', 'Las contraseñas no coinciden', 'Por favor verifique que ambas contraseñas sean iguales')
      return
    }
    let password = this.passwordForm.value.password
    this.presentLoading()
    let data = await this.authService.sendPasswordData({ password: password, token: this.id }).toPromise()
    this.dismissLoading()
    if(data?.status == true){
      this.presentAlert('Éxito', 'Contraseña restablecida!', 'La contraseña se ha restablecido correctamente!')
    }else{
      this.presentAlert('Error', data?.message ? data?.message : '', data?.data ? data?.data : '')
    }
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
      cssClass: 'my-custom-class', message: 'Enviando información...', duration: 5000, mode: 'ios'
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }

  async dismissLoading(){
    await this.loadingController.dismiss()
  }
}
