import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { GenericFilterBody } from 'src/app/shared/services/data.service';
import { GenericCardProps } from 'src/app/generic-card-list/generic-card-list.page';

@Component({
  selector: 'app-career-item',
  templateUrl: './career-item.page.html',
  styleUrls: ['./career-item.page.scss'],
})
export class CareerItemPage implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
  }

  showCategory(){
    let pageTitle = 'Course List'
    let requestBody:GenericFilterBody = {} as GenericFilterBody

    let extras:GenericCardProps = {
      collectionKeyword:"courses",
      requestBody: requestBody,
      pageTitle: pageTitle,
      colSize: 6,

      upperTitle: 'Ingenieria en ciencias y sistemas',
      upperSubtitle: 'Esta es una carrera de mucho rendimiento',

      avatarImgProperty: 'image',
      avatarTitleProperty: 'name',
      avatarSubtitleProperty: 'description',

      imgProperty: 'image',
      titleProperty: 'name',
      subtitleProperty: 'description',

      link1: null,
      link2: null,
      
      fixedData:[]
    }
    let navigationExtras: NavigationExtras = {
      state: extras
    };
    this.router.navigate(['/generic-card-list'], navigationExtras);
  }

}
