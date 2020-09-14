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

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {
  @Input() post:PostSchema
  maxStringLength = 50

  /** REACTION WORK */
  reactionConstants = REACTIONKEYS; 
  reactionService: ReactionService
  _observableReactionList: Observable<ReactionSchema[]>
  /**************** */

  constructor(
    private postsService: PostsService,
    public modalController: ModalController,
    public tokenStorageService: TokenStorageService
  ) {
  }

  ngOnInit() {
    this.reactionService = new ReactionService(this.postsService, 
      this.tokenStorageService, this.post.reactions)
    this._observableReactionList = this.reactionService.getObservableReactionList
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

  showReactions(){
    
  }  

  async showComments() {
    const modal = await this.modalController.create({
      component: CommentModalPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'firstName': 'Douglas',
        'lastName': 'Adams',
        'middleInitial': 'N'
      }
    });
    return await modal.present();
  }

  /*** REACTION WORK */
  checkReaction(reactionNumber: number){
    this.reactionService.orderReactions(this.post.reactions)
    this.reactionService.checkReaction(this.post, reactionNumber)
  }
  /****************** */

}
