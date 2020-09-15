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
import { postsKeyword } from 'src/app/schemas/SchemaNameConstants';
import { CommentService } from './comment.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {
  @Input() post:PostSchema
  maxStringLength = 50
  tmpComment:string = ''

  /** REACTION WORK */
  reactionConstants = REACTIONKEYS; 
  _observableReactionList: Observable<ReactionSchema[]>
  /**************** */
  /** COMMENTS WORK */
  _observableCommentList: Observable<PostSchema[]>

  constructor(
    private postsService: PostsService,
    public modalController: ModalController,
    public tokenStorageService: TokenStorageService,
    public reactionService:ReactionService,
    public commentService:CommentService
  ) {
  }

  ngOnInit() {
    this.reactionService = new ReactionService(this.postsService, 
      this.tokenStorageService)
    this.reactionService.assingElementsToObservable(this.post.reactions)
    this._observableReactionList = this.reactionService.getObservableReactionList

    this.commentService = new CommentService(this.postsService, 
      this.tokenStorageService)
    this.commentService.assingElementsToObservable(this.post.childComments)
    this._observableCommentList = this.commentService.getObservableCommentList
  }


  substractTime(date: string){
    return substractTimeZone(date)
  }

  processName(user: UserSchema){
    if(user){
      return user.username
    }else{
      return "Anónimo"
    }
  }

  processContent(post: PostSchema){
    if(this.checkWrapping(post.content)){
      return post.content.substring(0, this.maxStringLength)
    }
    return post.content
  }

  checkWrapping(content: any){
    if(content.length > this.maxStringLength){
      return true
    }
    return false
  }

  /*** REACTION WORK */
  showReactions(){
    
  } 

  checkReaction(reactionNumber: number){
    this.reactionService.orderReactions(this.post.reactions)
    this.reactionService.checkReaction(this.post, reactionNumber)
  }
  /****************** */

  /*** COMMENTS WORK */  
  saveComment(){
    this.commentService.saveCommentToServer(this.post, this.tmpComment, undefined)
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

}
