import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PostSchema } from 'src/app/schemas/post';
import { GenericFilterBody, PostsService } from '../../post.service';
import { postsKeyword } from 'src/app/schemas/SchemaNameConstants';
import { CommentService } from '../comment.service';
import { UserSchema } from 'src/app/schemas/user';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.page.html',
  styleUrls: ['./comment-modal.page.scss'],
})
export class CommentModalPage implements OnInit {
  @Input() parentPost: PostSchema;
  comments: PostSchema[]
  tmpComment:string = ''
  selectedComment: PostSchema;
  _observableCommentList: Observable<PostSchema[]>

  constructor(public modalCtrl: ModalController, 
    private postsService: PostsService,
    public commentService:CommentService,
    public tokenStorageService: TokenStorageService,) { }

  ngOnInit() {
    let requestBody:GenericFilterBody = {} as GenericFilterBody
    requestBody.query = { 'postAsComment.parentCommentOrPost': this.parentPost._id }
    requestBody.populate = 'user'
    requestBody.populate2 = 'childComments'
    requestBody.populate2 = 'postAsComment.mentionedUser'
    this.postsService.findAllFilter(postsKeyword, requestBody).subscribe((res) => {
      this.comments = res;
      this.initObservable(this.comments)
    })
  }

  initObservable(comments: PostSchema[]){
    this.commentService = new CommentService(this.postsService, 
      this.tokenStorageService)
    this.commentService.assingElementsToObservable(comments)
    this._observableCommentList = this.commentService.getObservableCommentList
  }

  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  saveCommentOfComment(){
    this.commentService.saveCommentToServer(this.parentPost, this.tmpComment, this.parentPost.user)
    this.tmpComment = ''
  }

}
