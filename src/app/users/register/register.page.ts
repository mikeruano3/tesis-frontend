import { Component, Input, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { TokenStorageService } from '../../auth/token-storage.service';
import { UserSchema } from '../../schemas/user';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  userData:UserSchema = null
  registerForm: FormGroup
  errorMessage = '';
  
  isSuccessful = false
  isSignUpFailed = false
  isEditing:boolean = false
  userHome:string = '/tablinks/users-home'

  constructor(private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    public alertController: AlertController,
    private tokenStorage: TokenStorageService,
    private loadingController: LoadingController,
    private zone: NgZone) { 
    this.clearForm({} as UserSchema)
    let params = this.route.queryParams.subscribe(params => {
      let navigationState = this.router.getCurrentNavigation().extras.state
      if (navigationState) 
      {
        this.userData = navigationState.userData
        if(this.userData._id){
          this.isEditing = true
        }
        this.clearForm(this.userData)
      }
    });
  }

  clearForm(user:UserSchema){
    let passvalidator = this.isEditing == true ? [] : Validators.compose([Validators.required, Validators.minLength(5)])

    this.registerForm = this.fb.group({
      username: [user?.username, Validators.required],
      email: [user?.email, Validators.required],
      password:[undefined, passvalidator],
      fullname: [user?.fullname, Validators.required],
      profession: [user?.profession],
      direction: [user?.direction],
      university: [user?.university, Validators.required]
    })
  }

  ngOnInit(): void { }

  async onFormSubmit() {
    if(!this.isEditing){
      this.onFormFirstRegisterSubmit()
    }else{
      this.onFormUpdatingSubmit()
    }
  }

  async onFormFirstRegisterSubmit() {
    this.isSignUpFailed = false; this.errorMessage = '';
    if(this.registerForm.invalid){
      return
    }
    this.presentLoading()
    let regData = await this.authService.registerAppUser(this.registerForm.value).toPromise()
    this.dismissLoading()
    console.log(regData);
    if(regData?.status == "true" || regData?.status == true){
      await this.presentAlert('Éxito', '', 'Usuario creado exitosamente!')
      this.zone.run(() => {
        this.registerForm.reset()
        this.router.navigate([this.userHome]);
      })
    }else{
      this.errorMessage = regData?.message;
      this.isSignUpFailed = true;
      await this.presentAlert('Alerta', 'No se ha podido crear el usuario', this.errorMessage)
    }
  }

  async onFormUpdatingSubmit() {
    this.isSignUpFailed = false; this.errorMessage = '';
    if(this.registerForm.invalid){
      return
    }
    if(this.registerForm.value.password == null){
      this.registerForm.value['password'] = undefined
    }
    this.presentLoading()
    let regData = await this.authService.updateAppUser(this.userData._id, this.registerForm.value).toPromise()
    this.dismissLoading()
    console.log(regData);
    if(regData?.status == "true" || regData?.status == true){
      await this.presentAlert('Éxito', 'Usuario actualizado exitosamente!', 'Los cambios se aplicarán al reiniciar la sesión')
      this.zone.run(() => {
        this.registerForm.reset()
        this.router.navigate([this.userHome]);
      })
    }else{
      this.errorMessage = regData?.message;
      this.isSignUpFailed = true;
      await this.presentAlert('Alerta', 'No se ha podido actualizar el usuario', this.errorMessage)
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
      cssClass: 'my-custom-class', message: 'Por favor espere...', duration: 5000, mode: 'ios'
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }

  async dismissLoading(){
    await this.loadingController.dismiss()
  }

}
