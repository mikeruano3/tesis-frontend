import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import * as moment from 'moment';
import { UserSchema } from 'src/app/schemas/user';
import { TokenStorageService } from '../../auth/token-storage.service';

@Component({
  selector: 'app-users-home',
  templateUrl: './users-home.page.html',
  styleUrls: ['./users-home.page.scss'],
})
export class UsersHomePage implements OnInit {
  userData:UserSchema = null

  constructor( private tokenStorage: TokenStorageService, 
    private router: Router, private route: ActivatedRoute) {
      let params = this.route.queryParams.subscribe(params => {
        
        let navigationState = this.router.getCurrentNavigation().extras.state
        if (navigationState?.clearHistory) 
        {
          this.getUserInfo()
        }
      });
     }

  ngOnInit() { 
    this.getUserInfo() 
  }

  logout(){
    this.userData = null
    this.tokenStorage.signOut()
  }

  async getUserInfo(){
    this.userData = await this.tokenStorage.getUserSchema()
    //console.log(this.userData);
  }

  getDate(date){
    return moment(date).format('ll');
  }

  async editUserData(){
    let navigationExtras: NavigationExtras = {
      state: {
        userData: this.userData
      }
    }
    this.router.navigate(['/register'], navigationExtras);
  }

  async openAdminDashboard(){
    let navigationExtras: NavigationExtras = {
      state: {
        userData: this.userData
      }
    }
    this.router.navigate(['/admin-management'], navigationExtras);
  }
  
}
