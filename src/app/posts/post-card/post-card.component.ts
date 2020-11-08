import { Component, OnInit, Input } from '@angular/core';
import { PostSchema } from 'src/app/schemas/post';
import { substractTimeZone } from 'src/app/shared/functions/localDate';
import { PostsService } from '../post.service';
import { UserSchema } from 'src/app/schemas/user';
import { ModalController } from '@ionic/angular';
import { CommentModalPage } from './comment-modal/comment-modal.page';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { ReactionSchema } from 'src/app/schemas/reaction';
import { REACTIONKEYS } from './post-card.constants';
import { Observable } from 'rxjs';
import { ReactionService } from "./reaction.service";
import { CommentService } from './comment.service';
import { Router, NavigationExtras } from '@angular/router';
import { PostHandlerService } from './post-handler.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {
  @Input() post:PostSchema
  @Input() isFullView: boolean
  @Input() showAvatar: boolean
  @Input() showReactCtnr: boolean

  maxStringLength = 50
  tmpComment:string = ''

  /** REACTION WORK */
  reactionConstants = REACTIONKEYS; 
  _observableReactionList: Observable<ReactionSchema[]>
  /**************** */

  constructor(
    private postsService: PostsService,
    public modalController: ModalController,
    public tokenStorageService: TokenStorageService,
    public reactionService:ReactionService,
    public commentService:CommentService,
    private router: Router,
    private postHandler: PostHandlerService
  ) {
  }

  ngOnInit() {
    this.reactionService = new ReactionService(this.postsService, 
      this.tokenStorageService)
    this.reactionService.assingElementsToObservable(this.post.reactions)
    this._observableReactionList = this.reactionService.getObservableReactionList
  }


  substractTime(date: string){
    return substractTimeZone(date)
  }

  processName(user: UserSchema){
    return user && user.username ? user.username : "Anónimo"
  }

  processContent(post: PostSchema){
    return (!this.isFullView && 
      this.checkWrapping(post.content)) ? post.content.substring(0, this.maxStringLength) : post.content
  }

  processProfilePic(user: UserSchema){
    return user && user.image ? user.image : "/assets/img/profile.jpg"
  }

  checkWrapping(content: any){
    return (!this.isFullView 
      && content.length > this.maxStringLength) ? true : false
  }

  checkReaction(reactionNumber: number){
    this.reactionService.orderReactions(this.post.reactions)
    this.reactionService.checkReaction(this.post, reactionNumber)
  }
  /****************** */

  /*** COMMENTS WORK */  
  async saveComment(){
    if(this.tmpComment == ''){
      return
    }
    let returnedComment = await this.commentService.saveCommentToServer(this.post, this.tmpComment, undefined)
    if(!this.post.childComments){
      this.post.childComments = []
    }
    this.post.childComments.push(returnedComment)
    this.tmpComment = ''
  }
  
  async showComments() {
    const modal = await this.modalController.create({
      component: CommentModalPage,
      cssClass: 'my-custom-class',
      componentProps: {
        parentPost: this.post
      }
    });
    return await modal.present();
  }
  /****************** */

  openPost(post: PostSchema){
    let navigationExtras: NavigationExtras = {
      state: {
        post: post,
        isFullView: true
      }
    };
    this.router.navigate(['/post-viewer'], navigationExtras);
  }

  /****** FILES */
  slideOpts = {
    initialSlide: 1,
    slidesPerView: 3,
    spaceBetween: 0.5,
    freeMode: true,
    navigation: true,
    watchSlidesProgress: true,
    //slidesOffsetAfter: 100,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  }

  openBrowserLinks(link:string){
    window.open(link, '_system', 'location=yes'); return false;
  }

  async presentActionSheet(post: PostSchema){
    await this.postHandler.presentActionSheet(post)
  }
}
