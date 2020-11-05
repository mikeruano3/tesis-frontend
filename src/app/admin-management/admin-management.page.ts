import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { APPCONSTANTS } from '../constants/app-constants';
import { DataService } from '../shared/services/data.service';
import { CategoryGenericProps } from './generic/interfaces/category-props.interface';

@Component({
  selector: 'app-admin-management',
  templateUrl: './admin-management.page.html',
  styleUrls: ['./admin-management.page.scss'],
})
export class AdminManagementPage implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router,private dataService: DataService) { }

  ngOnInit() {}

  agregarCarrera(){
    let props:CategoryGenericProps = { 
      pageTitle: 'Agregar Carrera',
      origin: 'NEW',
      
      fetchParentCategoryFilterKeyWord: APPCONSTANTS.CATEGORIES.CAREER_CATEGORIES,
      localStorageRefName: 'carrera-post',
      newCategoryKeyword: APPCONSTANTS.CATEGORIES.CAREERS,

      parentCategory: true,
      university: true,
      avatarImg: true,
      avatarTitle: true,
      avatarSubtitle: true,
      topImg: true,
      title: true,
      subtitle: true,
      link:true,
      pinned: true
    }
    let navigationExtras: NavigationExtras = {
      state: props
    }
    this.router.navigate([ '/admin-management/add-category' ], navigationExtras);
  }

}
