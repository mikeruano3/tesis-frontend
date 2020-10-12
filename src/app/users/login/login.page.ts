import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { TokenStorageService } from '../../auth/token-storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleSchema } from 'src/app/schemas/role';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role: RoleSchema;

  constructor(private authService: AuthService, 
    private tokenStorage: TokenStorageService,
    private router: Router,
    public fb: FormBuilder,
    private zone: NgZone
  ) {
    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password:[null,Validators.compose([Validators.required, Validators.minLength(0)])]
    })
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.role = this.tokenStorage.getUserData().role;
    }
  }

  onFormSubmit() {
    if (!this.loginForm.valid) {
      return
    }
    this.authService.login(this.loginForm.value)
      .subscribe(
        resdata => {
          console.log(resdata)
          if(resdata.status === "true"){
            this.tokenStorage.saveToken(resdata.data.accessToken);
            this.tokenStorage.saveUser(resdata.data);
            
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.zone.run(() => {
              this.loginForm.reset();
              this.router.navigate(['/home']);
            })
          }else{
            this.errorMessage = resdata.message;
            this.isLoginFailed = true;
          }
        },
        err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
    );
  }

  logout(){
    this.tokenStorage.signOut()
  }

}
