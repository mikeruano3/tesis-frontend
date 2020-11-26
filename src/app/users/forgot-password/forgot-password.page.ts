import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  forgotForm: FormGroup

  constructor(private authService: AuthService,  
    private loadingController: LoadingController,
    public alertController: AlertController,
    public fb: FormBuilder) { 
      
      this.forgotForm = this.fb.group({
        email: [null, Validators.required],
      })
    }

  ngOnInit() {
  }

  async sendEmailRequest(event){
    if(!this.forgotForm.valid){
      return
    }
    this.presentLoading()
    let data = await this.authService.sendResetPassword({ email: this.forgotForm.value.email }).toPromise()
    this.dismissLoading()
    if(data?.status == true){
      this.presentAlert('Éxito', 'Email enviado', 'Se ha enviado el email con las instrucciones para reestablecer la contraseña')
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
