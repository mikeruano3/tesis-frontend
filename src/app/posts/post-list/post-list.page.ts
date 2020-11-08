import { Component, OnInit } from '@angular/core';
import { PostsService } from '../post.service';
import { PostSchema } from '../../schemas/post';
import { GenericFilterBody } from 'src/app/shared/services/data.service';
import { APPCONSTANTS } from '../../constants/app-constants';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.page.html',
  styleUrls: ['./post-list.page.scss'],
})
export class PostListPage implements OnInit {
  requestBody: GenericFilterBody
  posts: PostSchema[] = []
  maxStringLength = 50
  newPostCategoryId:string = null
  newPostClasification:string = null
  newPostUniversity:string = null // !IMPORTANT
  /**** FILTER ****/
  filteredRequestBody: GenericFilterBody
  selectedFilter:string = 'popular'

  limitHandler:number = undefined
  definedLimit:number = 10
  skipHandler:number = undefined
  pageTitle:string
  pageSubTitle:string

  constructor(private route: ActivatedRoute, private router: Router,private postsService: PostsService,
      public loadingController: LoadingController) {
    this.route.queryParams.subscribe(params => {
      let navigationState = this.router.getCurrentNavigation().extras.state
      if (navigationState) 
      { 
        this.requestBody = navigationState.requestBody as GenericFilterBody
        this.newPostCategoryId = navigationState.newPostCategoryId
        this.newPostClasification = navigationState.newPostClasification
        this.newPostUniversity = navigationState.newPostUniversity
        this.pageTitle = navigationState.pageTitle
        this.pageSubTitle = navigationState.pageSubTitle
      }
      if(this.router.url == '/tablinks/contact'){
        this.setContactPageData()
      }
    });
   }

  ngOnInit() {
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class', message: 'Por favor espere...', duration: 5000, mode: 'ios'
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }

  async dismissLoading(){
    await this.loadingController.dismiss()
  }

  /*** FETCHING AND ORDERING DATA */
  async ionViewDidEnter() {
    this.masPopular()
  }

  async setSelectedFilter(){
    switch (this.selectedFilter) {
      case 'popular':
        this.masPopular()
        break;
      case 'masreciente':
        this.masReciente()
        break;
      default:
        break;
    }
  }

  async masPopular(){
    this.filteredRequestBody = { ...this.requestBody }
    this.filteredRequestBody.sort = { pinned: -1, reactionCount: -1 }
    await this.fetchFiltroComun()
  }

  async masReciente(){
    this.filteredRequestBody = { ...this.requestBody }
    this.filteredRequestBody.sort = { pinned: -1, createdAt: -1 }
    await this.fetchFiltroComun()
  }

  async fetchFiltroComun(){
    this.resetLimitAndSkip()
    this.presentLoading()
    await this.fetchInfo()
    this.dismissLoading()
  }

  async fetchInfo(){
    this.filteredRequestBody.limit = this.limitHandler
    this.filteredRequestBody.skip = this.skipHandler
    let promise = this.postsService.findAllFilter(APPCONSTANTS.SCHEMAS.POSTS_SCHEMA, this.filteredRequestBody).toPromise()
    let data = await promise;
    this.posts.push.apply(this.posts, data)
    //console.log(this.posts.length);
  }

  resetLimitAndSkip(){
    this.posts = []
    this.limitHandler = this.definedLimit
    this.skipHandler = 0
  }

  /**** HANDLING CHUNKS  */

  async loadData(event) {
    this.incrementSkip()
    await this.fetchInfo()
    event.target.complete()
  }
  
  incrementSkip(){
    this.skipHandler = this.skipHandler + this.definedLimit
  }

  /****** REFRESHENER ****/

  async doRefresh(event) {
    this.resetLimitAndSkip()
    await this.fetchInfo()
    event.target.complete()
  }

  /** NEW POST WORK ***/

  showNewPost(){
    let navigationExtras: NavigationExtras = {
      state: {
          newPostCategoryId: this.newPostCategoryId,
          newPostClasification: this.newPostClasification,
          newPostUniversity: this.newPostUniversity
      }
    };
    this.router.navigate(['/post-editor'], navigationExtras);
  }

  /*** CONTACT WORK */
  setContactPageData(){
    let requestBody:GenericFilterBody = {} as GenericFilterBody
    requestBody.query = {
      postClasification: APPCONSTANTS.CATEGORIES.CONTACTS,
    }
    requestBody.populate = 'reactions'
    requestBody.populate2 = 'user'
    
    this.requestBody = requestBody as GenericFilterBody
    //this.newPostCategoryId
    this.newPostClasification = APPCONSTANTS.CATEGORIES.CONTACTS,
    //this.newPostUniversity
    this.pageTitle = 'Contactos Útiles'
    this.pageSubTitle = 'Publica tu información para que los usuarios te puedan contactar'
  }

}
