import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { APPCONSTANTS } from '../constants/app-constants';
import { GenericRedirection } from '../generic-card-list/generic-redirection';
import { CategorySchema } from '../schemas/category';
import { PostSchema } from '../schemas/post';
import { DataService, GenericFilterBody } from '../shared/services/data.service';

@Component({
  selector: 'app-home-landing',
  templateUrl: './home-landing.page.html',
  styleUrls: ['./home-landing.page.scss'],
})
export class HomeLandingPage implements OnInit {

  /*** CARRER DATA *****/
  careerList: CategorySchema[] = []
  findedCareerItems: CategorySchema[] = []
  isCarrerItemAvailable:boolean = false
  loadingCareerData:boolean = false
  /*** ******************/

  /*****CATEGORIES PANEL *****/
  categoryList: CategorySchema[] = []
  /*** ******************/

  /***** OTHERS PANEL *****/
  materialList: PostSchema[] = []
  experiencesList: PostSchema[] = []
  consejosList: PostSchema[] = []
   /*** ******************/
  
  /*** MOST COMMON CARRER PANEL */
  slideOpts = {
    initialSlide: 1,
    slidesPerView: 2,
    freeMode: true,
    navigation: true,
    watchSlidesProgress: true,
    slidesOffsetAfter: 1,
    spaceBetween: 0,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
  }

  slideOptsCat = { ...this.slideOpts, slidesPerView: 1}
  
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute, private router: Router
  ) {
  }

  ngOnInit() { }

  ionViewDidEnter() {
    this.initCareerData()
    this.initCategoriesData()
    this.initMaterialDeEstudioData()
    this.initExperienciasData()
    this.initConsejosData()
  }

  /**** CARRER WITH NO IMAGE FUNCTIONS *****/
  restoreCareerItems(){
    this.findedCareerItems = this.careerList
  }

  getCareerItems(ev: any) {
    // Reset items back to all of the items
    this.restoreCareerItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
        this.isCarrerItemAvailable = true;
        this.findedCareerItems = this.findedCareerItems.filter((item) => {
            return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
    } else {
        this.isCarrerItemAvailable = false;
    }
  }

  async initCareerData(){
    let reqCareersBody: GenericFilterBody = {} as GenericFilterBody
    reqCareersBody.query = {
      categoryKeyword: APPCONSTANTS.CATEGORIES.CAREERS,
    }
    reqCareersBody.projection = { topImg: 0 }
    this.loadingCareerData = true
    let items = await this.dataService.findAllFilter(APPCONSTANTS.SCHEMAS.CATEGORIES_SCHEMA, reqCareersBody).toPromise()
    this.careerList = items;
    this.restoreCareerItems()
    this.loadingCareerData = false
  }

  handleCareerClick(item: CategorySchema){
    let redir:GenericRedirection = new GenericRedirection(this.route, this.router)
    redir.redirectToSingleCareerDashboard(item, null)
  }

  /** YOU CAN CHANGE FROM HERE!!!!!!!!!!!! */
  /*****CATEGORIES PANEL *****/
  async initCategoriesData(){
    let reqCareersBody: GenericFilterBody = {} as GenericFilterBody
    reqCareersBody.query = {
      categoryKeyword: APPCONSTANTS.CATEGORIES.CAREER_CATEGORIES,
    }
    this.categoryList = await this.dataService.findAllFilter(APPCONSTANTS.SCHEMAS.CATEGORIES_SCHEMA, reqCareersBody).toPromise();
  }

  handleCategoriesClick(item: CategorySchema){
    let redir:GenericRedirection = new GenericRedirection(this.route, this.router)
    redir.redirectToCareersOrderedByCategory(item, null)
  }

  /*** MATERIAL DE ESTUDIO PANEL */
  async initMaterialDeEstudioData(){
    let reqCareersBody: GenericFilterBody = {} as GenericFilterBody
    reqCareersBody.query = {
      postClasification: APPCONSTANTS.CATEGORIES.CAREER_SECTIONS.MATERIAL_ESTUDIO,
    }
    reqCareersBody.sort = { pinned: -1, reactionCount: -1, createdAt: -1 }
    reqCareersBody.limit = 10

    this.materialList = await this.dataService.findAllFilter(APPCONSTANTS.SCHEMAS.POSTS_SCHEMA, reqCareersBody).toPromise();
  }

  /*** EXPERIENCIAS PANEL */
  async initExperienciasData(){
    let reqCareersBody: GenericFilterBody = {} as GenericFilterBody
    reqCareersBody.query = {
      postClasification: APPCONSTANTS.CATEGORIES.CAREER_SECTIONS.EXPERIENCIAS_EGRESADOS,
    }
    reqCareersBody.sort = { pinned: -1, reactionCount: -1, createdAt: -1 }
    reqCareersBody.limit = 10

    this.experiencesList = await this.dataService.findAllFilter(APPCONSTANTS.SCHEMAS.POSTS_SCHEMA, reqCareersBody).toPromise();
  }

   /*** CONSEJOS PANEL */
   async initConsejosData(){
    let reqCareersBody: GenericFilterBody = {} as GenericFilterBody
    reqCareersBody.query = {
      postClasification: APPCONSTANTS.CATEGORIES.CAREER_SECTIONS.CONSEJOS,
    }
    reqCareersBody.sort = { pinned: -1, reactionCount: -1, createdAt: -1 }
    reqCareersBody.limit = 10

    this.consejosList = await this.dataService.findAllFilter(APPCONSTANTS.SCHEMAS.POSTS_SCHEMA, reqCareersBody).toPromise();
  }

  /*** POSTS COMMON */
  handlePostClick(post: PostSchema){
    let navigationExtras: NavigationExtras = {
      state: {
        post: post,
        isFullView: true
      }
    };
    this.router.navigate(['/post-viewer'], navigationExtras);
  }

  verMasPosts(){
    this.router.navigate(['/tablinks/career-list']);
  }

}
