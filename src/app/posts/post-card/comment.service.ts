import { PostSchema } from 'src/app/schemas/post';
import { PostsService } from '../post.service';
import { UserSchema } from 'src/app/schemas/user';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { ReactionSchema } from 'src/app/schemas/reaction';
import { REACTIONKEYS, localSavedReaction } from './post-card.constants';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { groupBy, toArray, mergeMap, map, first } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { APPCONSTANTS } from 'src/app/constants/app-constants';

@Injectable({
  providedIn: 'root'
})

export class CommentService {
  private _commentList: PostSchema[] = []

  constructor(
    private postsService: PostsService,
    public tokenStorageService: TokenStorageService 
  ) { }

  async saveCommentToServer(parentPost: PostSchema, commentContent: any, mentionedUser: UserSchema){
    const tmpComment = commentContent
    let user = this.tokenStorageService.getUserData()
    let commentData:PostSchema = {} as PostSchema
    commentData.user = user || undefined
    commentData.content = tmpComment
    commentData.childComments = [];
    commentData.postAsComment = {
      parentCommentOrPost: parentPost,
      mentionedUser: mentionedUser
    }
    
    let resComment = await this.postsService.saveOne(APPCONSTANTS.SCHEMAS.POSTS_SCHEMA, commentData).toPromise()
    if(!resComment){
      return
    }

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
    await this.postsService.updateOne(APPCONSTANTS.SCHEMAS.POSTS_SCHEMA, queryUpdate).toPromise()
    return resComment
  }

}