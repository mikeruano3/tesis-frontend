import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PostSchema } from 'src/app/schemas/post';
import { PostsService } from '../../post.service';
import { CommentService } from '../comment.service';
import { UserSchema } from 'src/app/schemas/user';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { GenericFilterBody } from 'src/app/shared/services/data.service';
import { APPCONSTANTS } from 'src/app/constants/app-constants';

@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.page.html',
  styleUrls: ['./comment-modal.page.scss'],
})
export class CommentModalPage implements OnInit {
  parentPost: PostSchema
  comments: PostSchema[]
  tmpComment:string = ''
  selectedComment: PostSchema;
  //_observableCommentList: Observable<PostSchema[]>


  filteredRequestBody: GenericFilterBody
  limitHandler:number = undefined
  definedLimit:number = 15
  skipHandler:number = undefined

  constructor(public modalCtrl: ModalController, 
    private postsService: PostsService,
    public commentService:CommentService,
    public tokenStorageService: TokenStorageService,) { }

  async ngOnInit() {
    let requestBody:GenericFilterBody = {} as GenericFilterBody
    requestBody.query = { 'postAsComment.parentCommentOrPost': this.parentPost._id }
    requestBody.populate = 'user'
    requestBody.populate2 = 'childComments'
    requestBody.populate2 = 'postAsComment.mentionedUser'
    this.filteredRequestBody = { ...requestBody}
    this.resetLimitAndSkip()
    await this.fetchInfo()
    this.initObservable()
  }

  async fetchInfo(){
    this.filteredRequestBody.limit = this.limitHandler
    this.filteredRequestBody.skip = this.skipHandler
    let promise = this.postsService.findAllFilter(APPCONSTANTS.SCHEMAS.POSTS_SCHEMA, this.filteredRequestBody).toPromise()
    let data = await promise;
    this.comments.push.apply(this.comments, data)
    console.log(this.comments.length);
  }
  async loadData(event) {
    this.incrementSkip()
    await this.fetchInfo()
    event.target.complete()
  }
  resetLimitAndSkip(){
    this.comments = []
    this.limitHandler = this.definedLimit
    this.skipHandler = 0
  }
  incrementSkip(){
    this.skipHandler = this.skipHandler + this.definedLimit
  }
  initObservable(){
    /*this.commentService = new CommentService(this.postsService, 
      this.tokenStorageService)
    this.commentService.assingElementsToObservable(this.comments)
    this._observableCommentList = this.commentService.getObservableCommentList
    */
  }
  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  async saveCommentOfComment(){
    if(this.tmpComment == ''){
      return
    }
    let returnedComment = await this.commentService.saveCommentToServer(this.parentPost, this.tmpComment, undefined)
    if(!this.parentPost.childComments){
      this.parentPost.childComments = []
    }
    this.parentPost.childComments.push(returnedComment)
    this.comments.push(returnedComment)
    this.tmpComment = ''
  }

}
