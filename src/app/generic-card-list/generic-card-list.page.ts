import { Component, OnInit, Input } from '@angular/core';
import { DataService, GenericFilterBody } from '../shared/services/data.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { GenericRedirection } from './generic-redirection';
import { CategorySchema } from '../schemas/category';
import { APPCONSTANTS } from '../constants/app-constants';

export interface GenericCardProps {
  // Common
  collectionKeyword:string
  requestBody:GenericFilterBody
  pageTitle:string
  colSize:number

  // Title
  upperImageSrc:string
  upperTitle:string
  upperSubtitle:string

  //Links
  link1:string
  link2:string

  // Avatar
  avatarImgProperty: string
  avatarTitleProperty: string
  avatarSubtitleProperty:string
  
  // Content
  imgProperty:string
  titleProperty: string
  subtitleProperty: string

  // fixedContentToShow
  fixedData:any[]

  //dataFilterProperty
  dataFilterProperty:string
  dataFilterPlaceholder:string

  //redirectTo
  redirectToDesc:string
}

@Component({
  selector: 'app-generic-card-list',
  templateUrl: './generic-card-list.page.html',
  styleUrls: ['./generic-card-list.page.scss'],
})

export class GenericCardListPage implements OnInit {
  @Input() props:GenericCardProps
  @Input() useAsComponent:boolean = false
  genericList:any[] = []
  isItemAvailable = false
  findedItems:any[] = []

  /******* FILL COMPONENT DATA *********/
  constructor(private route: ActivatedRoute, private router: Router,private dataService: DataService) {
    this.route.queryParams.subscribe(params => {
      let navigationState:GenericCardProps = this.router.getCurrentNavigation().extras.state as GenericCardProps
      if (navigationState) 
      {
        this.props = navigationState
      }
    });
   }

  ngOnInit() {
    // Cuando se usa como componente
    if(this.useAsComponent){
      this.initData()
    }
  }

  ionViewDidEnter() {
    // Cuando se usa toda la vista
    this.initData()  
  }

  initData(){
    if(this.props.fixedData.length === 0){
      this.dataService.findAllFilter(this.props.collectionKeyword, this.props.requestBody).subscribe((res) => {
        this.genericList = res;
        this.restoreItems()
      })
    }else{
        this.genericList = this.props.fixedData
        this.restoreItems()
    }
  }

  /***************************/
  
  /****** SEARCH IN LIST ******/
  restoreItems(){
    this.findedItems = this.genericList
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.restoreItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
        this.isItemAvailable = true;
        this.findedItems = this.findedItems.filter((item) => {
            return (item[this.props.dataFilterProperty].toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
    } else {
        this.isItemAvailable = false;
    }
  }

  /***************************/


    /***** REDIRECT TO ACT *****/
    redirectToAction(item:any){
      let redir:GenericRedirection = new GenericRedirection(this.route, this.router)
      if(this.props.redirectToDesc == APPCONSTANTS.CATEGORIES.CAREERS){
        redir.redirectToCareersOrderedByCategory(item)
      }else if(this.props.redirectToDesc == APPCONSTANTS.CATEGORIES.CAREER_DASHBOARDS){
        redir.redirectToSingleCareerDashboard(item)
      }else if(this.props.redirectToDesc == APPCONSTANTS.CATEGORIES.CAREER_CLASIFFIED_POSTS){
        redir.redirectToCareerSubmenus(item)
      }
    }
  
}
