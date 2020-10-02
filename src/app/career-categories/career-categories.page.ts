import { Component, OnInit } from '@angular/core';
import { GenericCardProps } from 'src/app/generic-card-list/generic-card-list.page';
import { GenericFilterBody } from 'src/app/shared/services/data.service';
import { Router } from '@angular/router';
import { APPCONSTANTS } from 'src/app/constants/app-constants';

@Component({
  selector: 'app-career-categories',
  templateUrl: './career-categories.page.html',
  styleUrls: [],
})
export class CareerCategoriesPage implements OnInit {
  
  extras:GenericCardProps = {
    collectionKeyword:APPCONSTANTS.SCHEMAS.CATEGORIES_SCHEMA,
    requestBody: this.returnBody(),
    pageTitle:  'Categorías',
    colSize: 12,

    upperImageSrc: '../../assets/img/home.jpg',
    upperTitle: 'Categorías de Carreras',
    upperSubtitle: 'Toca en alguna categoría para ver más',

    avatarImgProperty: null,
    avatarTitleProperty: null,
    avatarSubtitleProperty: null,

    imgProperty: 'topImg',
    titleProperty: 'title',
    subtitleProperty: 'subtitle',

    link1: 'Ver todas las carreras',
    link2: null,
    
    fixedData:[],
    dataFilterProperty: 'title',
    dataFilterPlaceholder: 'Buscar categoría...',
    browserlink: null,

    redirectToDesc: APPCONSTANTS.CATEGORIES.CAREERS,
    lastParentInfo: null,
    lastProps: null
  }

  returnBody():GenericFilterBody{
    let requestBody = {} as GenericFilterBody
    requestBody.query = { categoryKeyword : APPCONSTANTS.CATEGORIES.CAREER_CATEGORIES }
    return requestBody
  }

  constructor( private router: Router) { }

  ngOnInit() {
  }

}
