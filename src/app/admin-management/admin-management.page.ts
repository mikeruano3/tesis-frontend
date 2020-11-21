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
      pageTitle: 'Carrera',
      origin: 'NEW',
      
      fetchParentCategoryFilterKeyWord: APPCONSTANTS.CATEGORIES.CAREER_CATEGORIES,
      localStorageRefName: 'carrera-post',
      newCategoryKeyword: APPCONSTANTS.CATEGORIES.CAREERS,
      editCategoryData:null,

      parentCategory: true,
      university: true,
      avatarImg: false,
      avatarTitle: false,
      avatarSubtitle: false,
      topImg: true,
      title: true,
      subtitle: true,
      link:false,
      pinned: false
    }
    let navigationExtras: NavigationExtras = {
      state: props
    }
    this.router.navigate([ '/admin-management/list-category' ], navigationExtras);
  }

  agregarCategoria(){
    let props:CategoryGenericProps = { 
      pageTitle: 'Categoría',
      origin: 'NEW',
      
      fetchParentCategoryFilterKeyWord: null,
      localStorageRefName: 'categoria-post',
      newCategoryKeyword: APPCONSTANTS.CATEGORIES.CAREER_CATEGORIES,
      editCategoryData:null,

      parentCategory: false,
      university: true,
      avatarImg: true,
      avatarTitle: false,
      avatarSubtitle: false,
      topImg: true,
      title: true,
      subtitle: true,
      link:false,
      pinned: false
    }
    let navigationExtras: NavigationExtras = {
      state: props
    }
    this.router.navigate([ '/admin-management/list-category' ], navigationExtras);
  }

  agregarUniversidad(){
    let props:CategoryGenericProps = { 
      pageTitle: 'Universidad',
      origin: 'NEW',
      
      fetchParentCategoryFilterKeyWord: null,
      localStorageRefName: 'universidad-post',
      newCategoryKeyword: APPCONSTANTS.CATEGORIES.UNIVERSITIES,
      editCategoryData:null,

      parentCategory: false,
      university: false,
      avatarImg: true,
      avatarTitle: true,
      avatarSubtitle: false,
      topImg: true,
      title: true,
      subtitle: true,
      link:false,
      pinned: false
    }
    let navigationExtras: NavigationExtras = {
      state: props
    }
    this.router.navigate([ '/admin-management/list-category' ], navigationExtras);
  }

  agregarPaginasOficiales(){
    let props:CategoryGenericProps = { 
      pageTitle: 'Páginas Oficiales',
      origin: 'NEW',
      
      fetchParentCategoryFilterKeyWord: APPCONSTANTS.CATEGORIES.CAREERS,
      localStorageRefName: 'paginas-post',
      newCategoryKeyword: APPCONSTANTS.CATEGORIES.CAREER_SECTIONS.PAGINAS_OFICIALES,
      editCategoryData:null,

      parentCategory: true,
      university: true,
      avatarImg: true,
      avatarTitle: true,
      avatarSubtitle: true,
      topImg: false,
      title: true,
      subtitle: true,
      link:true,
      pinned: false
    }
    let navigationExtras: NavigationExtras = {
      state: props
    }
    this.router.navigate([ '/admin-management/list-category' ], navigationExtras);
  }

  agregarPensum(){
    let props:CategoryGenericProps = { 
      pageTitle: 'Pénsum',
      origin: 'NEW',
      
      fetchParentCategoryFilterKeyWord: APPCONSTANTS.CATEGORIES.CAREERS,
      localStorageRefName: 'pensum-post',
      newCategoryKeyword: APPCONSTANTS.CATEGORIES.CAREER_SECTIONS.PENSUM_ESTUDIOS,
      editCategoryData:null,

      parentCategory: true,
      university: true,
      avatarImg: true,
      avatarTitle: true,
      avatarSubtitle: true,
      topImg: false,
      title: true,
      subtitle: true,
      link:true,
      pinned: false
    }
    let navigationExtras: NavigationExtras = {
      state: props
    }
    this.router.navigate([ '/admin-management/list-category' ], navigationExtras);
  }

}
