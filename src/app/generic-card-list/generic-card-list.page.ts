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

  // Links
  browserlink: string

  //redirectTo
  redirectToDesc:string
  lastParentInfo:CategorySchema
  lastProps:GenericCardProps
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
  loadingData:boolean = false

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

  async initData(){
    if(this.props.fixedData.length === 0){
      this.loadingData = true
      let items = await this.dataService.findAllFilter(this.props.collectionKeyword, this.props.requestBody).toPromise()
      this.genericList = items;
      this.restoreItems()
      this.loadingData = false
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
        redir.redirectToCareersOrderedByCategory(item, this.props)
      }else if(this.props.redirectToDesc == APPCONSTANTS.CATEGORIES.CAREER_PER_UNIVERSITY){
        redir.redirectToCareersOrderedByUniversity(item, this.props)
      }else if(this.props.redirectToDesc == APPCONSTANTS.CATEGORIES.CAREER_DASHBOARDS){
        redir.redirectToSingleCareerDashboard(item, this.props)
      }else if(this.props.redirectToDesc == APPCONSTANTS.CATEGORIES.CAREER_CLASIFFIED_POSTS){
        redir.redirectToCareerSubmenus(item, this.props)


      }else if(this.props.redirectToDesc == APPCONSTANTS.HELPER_CARRER_REDIRECTIONS.MATERIAL_ESTUDIO){
        redir.redirectToMaterialDeEstudio(item, this.props)
      }else if(this.props.redirectToDesc == APPCONSTANTS.HELPER_CARRER_REDIRECTIONS.PAGINAS_OFICIALES){
        redir.redirectToPaginasOficiales(item, this.props)
      }else if(this.props.redirectToDesc == APPCONSTANTS.HELPER_CARRER_REDIRECTIONS.PENSUM_ESTUDIOS){
        redir.redirectToPensumCarrera(item, this.props)
      }
    }

  openBrowserLinks(link:string){
    window.open(link, '_system', 'location=yes'); return false;
  }
  
}
