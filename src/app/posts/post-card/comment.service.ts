import { PostSchema } from 'src/app/schemas/post';
import { GenericFilterBody, PostsService } from '../post.service';
import { UserSchema } from 'src/app/schemas/user';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { ReactionSchema } from 'src/app/schemas/reaction';
import { REACTIONKEYS, localSavedReaction } from './post-card.constants';
import { reactionKeyword, postsKeyword } from 'src/app/schemas/SchemaNameConstants';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { groupBy, toArray, mergeMap, map, first } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CommentService {
  private _commentList: PostSchema[] = []
  private _observableCommentList: BehaviorSubject<PostSchema[]> = new BehaviorSubject([]);

  constructor(
    private postsService: PostsService,
    public tokenStorageService: TokenStorageService 
  ) { }

  saveCommentToServer(parentPost: PostSchema, commentContent: any, mentionedUser: UserSchema){
    const tmpComment = commentContent
    let user = this.tokenStorageService.getUser()
    let commentData:PostSchema = {} as PostSchema
    commentData.user = user || undefined
    commentData.content = tmpComment
    commentData.childComments = [];
    commentData.postAsComment = {
      parentCommentOrPost: parentPost,
      mentionedUser: mentionedUser
    }
    this.postsService.saveOne(postsKeyword, commentData).subscribe(resComment => {
      console.log(resComment);
      
      let responseCommment = resComment as PostSchema
      let queryUpdate = {
        "query": {
          "_id": parentPost._id
        },
        "data": {
          "$push": {
            "childComments": responseCommment._id
          }
        }
      }

      this.postsService.updateOne(postsKeyword, queryUpdate).subscribe((resPost) => {
        console.log(resPost);
        this.addCommentToObs(commentData)
      })
    })
  }

  get getObservableCommentList(): Observable<PostSchema[]> { return this._observableCommentList.asObservable() }

  addCommentToObs(post: PostSchema) {
    this._commentList.push(post);
    this._observableCommentList.next(this._commentList);
  }

  public assingElementsToObservable(posts: PostSchema[]){
    this._commentList = posts
    this._observableCommentList.next(this._commentList);
  }
}