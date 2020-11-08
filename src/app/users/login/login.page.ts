import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { TokenStorageService } from '../../auth/token-storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup
  isLoginFailed = false;
  errorMessage = '';
  redirectToPreviousPage:boolean
  
  constructor(private authService: AuthService, 
    private tokenStorage: TokenStorageService,
    private router: Router, private route: ActivatedRoute, 
    public fb: FormBuilder, private navCtrl: NavController,
    private loadingController: LoadingController,
    public alertController: AlertController,
    private zone: NgZone
  ) {
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      password:[null,Validators.compose([Validators.required, Validators.minLength(0)])]
    })

    this.route.queryParams.subscribe(async(params) => {
      let navigationState = this.router.getCurrentNavigation().extras.state
      if (navigationState) 
      {
        if(navigationState.redirectToPreviousPage){
          this.redirectToPreviousPage = navigationState.redirectToPreviousPage
        }
      }
    })
  }

  ngOnInit() {}

  onFormSubmit() {
    if (!this.loginForm.valid) {
      return
    }
    this.presentLoading()
    this.authService.login(this.loginForm.value)
      .subscribe(
        async (resData) => {
          this.dismissLoading()
          //console.log(resData);
          
          if(resData.status === true){
            await this.tokenStorage.saveToken(resData.data.accessToken);
            await this.tokenStorage.saveUserSchema(resData.data.userData);
            
            this.isLoginFailed = false;
            this.zone.run(() => {
              this.loginForm.reset();
              if(this.redirectToPreviousPage){
                this.navCtrl.pop()
              }else{
                this.router.navigate(['/tablinks/users-home'], { state:  { clearHistory: true }} as NavigationExtras);  
              }
            })
          }else{
            this.presentAlert('Alerta!', 'No se ha podido iniciar sesión', '')
            this.errorMessage = resData.message;
            this.isLoginFailed = true;
          }
        },
        err => {
          this.dismissLoading()
          this.presentAlert('Alerta', 'No se ha podido iniciar sesión', err.error?.message)
          this.errorMessage = err.error?.message;
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
      mode: 'ios',
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class', message: 'Iniciando sesión...', duration: 5000, mode: 'ios'
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }

  async dismissLoading(){
    await this.loadingController.dismiss()
  }


}
