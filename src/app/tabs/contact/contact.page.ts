import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APPCONSTANTS } from '../../constants/app-constants';
import { GenericFilterBody } from '../../shared/services/data.service';
import { GenericCardProps } from '../../generic-card-list/generic-card-list.page';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  extras:GenericCardProps = {
    collectionKeyword:APPCONSTANTS.SCHEMAS.CATEGORIES_SCHEMA,
    requestBody: this.returnBody(),
    pageTitle:  'Universidades',
    colSize: 12,

    upperImageSrc: '../../assets/img/home.jpg',
    upperTitle: 'Universidades',
    upperSubtitle: 'Toca en alguna universidad para ver más',

    avatarImgProperty: null,
    avatarTitleProperty: null,
    avatarSubtitleProperty: null,

    imgProperty: 'topImg',
    titleProperty: 'title',
    subtitleProperty: 'subtitle',

    link1: null,
    link2: null,
    
    fixedData:[],
    dataFilterProperty: 'title',
    dataFilterPlaceholder: 'Buscar universidad...',
    browserlink: null,

    redirectToDesc: APPCONSTANTS.CATEGORIES.CAREER_PER_UNIVERSITY,
    lastParentInfo: null,
    lastProps: null
  }

  returnBody():GenericFilterBody{
    let requestBody = {} as GenericFilterBody
    requestBody.query = { 
      categoryKeyword : APPCONSTANTS.CATEGORIES.UNIVERSITIES,
    }
    return requestBody
  }

  constructor( private router: Router) { }

  ngOnInit() {
  }

}
