import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { APPCONSTANTS } from '../../constants/app-constants';
import { GenericFilterBody } from '../../shared/services/data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  postListRoute:string = '/post-list'

  constructor( private router: Router) { }

  redirectToContacts(){
    let requestBody:GenericFilterBody = {} as GenericFilterBody
    requestBody.query = {
      postClasification: APPCONSTANTS.CATEGORIES.CONTACTS,
    }
    requestBody.populate = 'reactions'
    
    let navigationExtras: NavigationExtras = {
        state: {
            requestBody: requestBody,
            newPostClasification: APPCONSTANTS.CATEGORIES.CONTACTS,
            pageTitle: 'Contactos Útiles',
            pageSubTitle: 'Publica tu información para que los usuarios te puedan contactar'
        }
    };
    this.router.navigate([this.postListRoute], navigationExtras);
  }

  ngOnInit() {
    this.redirectToContacts()  
  }

}
