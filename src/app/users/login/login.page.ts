import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { TokenStorageService } from '../../auth/token-storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup
  isLoginFailed = false;
  errorMessage = '';
  
  constructor(private authService: AuthService, 
    private tokenStorage: TokenStorageService,
    private router: Router,
    public fb: FormBuilder,
    public alertController: AlertController,
    private zone: NgZone
  ) {
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      password:[null,Validators.compose([Validators.required, Validators.minLength(0)])]
    })
  }

  ngOnInit() {}

  onFormSubmit() {
    if (!this.loginForm.valid) {
      return
    }
    
    this.authService.login(this.loginForm.value)
      .subscribe(
        async (resData) => {
          console.log(resData);
          
          if(resData.status === true){
            await this.tokenStorage.saveToken(resData.data.accessToken);
            await this.tokenStorage.saveUserSchema(resData.data.userData);
            
            this.isLoginFailed = false;
            this.zone.run(() => {
              this.loginForm.reset();
              this.router.navigate(['/tablinks/users-home'], { state:  { clearHistory: true }} as NavigationExtras);
            })
          }else{
            this.presentAlert('Alerta!', 'No se ha podido iniciar sesión', '')
            this.errorMessage = resData;
            this.isLoginFailed = true;
          }
        },
        err => {
          this.presentAlert('Alerta', 'No se ha podido iniciar sesión', err.error.message)
          this.errorMessage = err;
          this.isLoginFailed = true;
        }
    );
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
