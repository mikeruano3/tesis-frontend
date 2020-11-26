import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-web-confirm-password',
  templateUrl: './web-confirm-password.page.html',
  styleUrls: ['./web-confirm-password.page.scss'],
})
export class WebConfirmPasswordPage implements OnInit {
  id:string
  errorText:string = null
  showSuccess:boolean = false

  constructor(private actRoute: ActivatedRoute, 
    private loadingController: LoadingController,
    private authService: AuthService,
    public fb: FormBuilder) { 
      this.id = this.actRoute.snapshot.paramMap.get('id')
  }

  ngOnInit() {
    if(this.id){
      this.confirmEmail()
    }
  }

  async confirmEmail(){
    this.presentLoading()
    let data = await this.authService.confirmEmail(this.id).toPromise()
    this.dismissLoading()
    if(data && data?.status == true){
      this.errorText = null
      this.showSuccess = true
    }else{
      this.errorText = data?.message
      this.showSuccess = false
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class', message: 'Confirmando correo electrónico...', duration: 5000, mode: 'ios'
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }

  async dismissLoading(){
    await this.loadingController.dismiss()
  }

}
