import { PostSchema } from 'src/app/schemas/post';
import { PostsService } from '../post.service';
import { UserSchema } from 'src/app/schemas/user';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { ReactionSchema } from 'src/app/schemas/reaction';
import { REACTIONKEYS, localSavedReaction } from './post-card.constants';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { groupBy, toArray, mergeMap, map, first } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { GenericFilterBody } from 'src/app/shared/services/data.service';
import { APPCONSTANTS } from 'src/app/constants/app-constants';

@Injectable({
  providedIn: 'root'
})

export class ReactionService {
  private _reactionList: ReactionSchema[] = []
  private _observableReactionList: BehaviorSubject<ReactionSchema[]> = new BehaviorSubject([]);

  constructor(
    private postsService: PostsService,
    public tokenStorageService: TokenStorageService 
  ) {
   
  }

  /**************** REACTIONS **************** */
  async checkReaction(post: PostSchema, reactionType: number) {
    console.log('post');
    console.log(post);

    let genericFilterBody: GenericFilterBody
    let user = await this.tokenStorageService.getUserSchema()
    if (user) {
      this.searchLoggedUserReaction(post, user).subscribe(data => {

        if (data.length === 0) {
          this.saveReactionToServer(post, user._id, reactionType)
        } else {
          let reactionData = data[0] as ReactionSchema
          this.updateReactionToServer(reactionData, reactionType)
        }
      })
    } else {
      let localSavedReaction = this.searchAnonymousReaction(post)
      if (localSavedReaction == null) {
        this.saveReactionToServer(post, undefined, reactionType)
      } else if (localSavedReaction.type != reactionType) {
        this.updateReactionToServer(localSavedReaction, reactionType)
      }
    }
  }

  searchAnonymousReaction(post: PostSchema): ReactionSchema {
    // Buscar la reaccion anonima
    let savedReactions: any = window.localStorage.getItem(REACTIONKEYS.localUserReactionsKey)
    if (savedReactions) {
      let parsedReacions: localSavedReaction[] = JSON.parse(savedReactions) as localSavedReaction[]
      for (let idx = 0; idx < parsedReacions.length; idx++) {
        const element = parsedReacions[idx];
        if (element.post._id === post._id) {
          return element.reaction
        }
      }
      return null
    } else {
      return null
    }
  }

  saveAnonymousReaction(reaction: ReactionSchema, post: PostSchema) {
    // Buscar la reaccion anonima
    let savedReactions: any = window.localStorage.getItem(REACTIONKEYS.localUserReactionsKey)
    let localSaved: localSavedReaction = {
      reaction: reaction,
      post: post
    }
    if (!savedReactions) {
      let reactions: localSavedReaction[] = []
      reactions.push(localSaved)
      window.localStorage.setItem(REACTIONKEYS.localUserReactionsKey, JSON.stringify(reactions))
    } else {
      let parsedReactions: localSavedReaction[] = JSON.parse(savedReactions) as localSavedReaction[]
      parsedReactions.push(localSaved)
    }
  }

  searchLoggedUserReaction(post: PostSchema, user: UserSchema): Observable<ReactionSchema[]> {
    let requestBody: GenericFilterBody = {} as GenericFilterBody
    requestBody.query = {
      post: post._id,
      user: user._id
    }
    return this.postsService.findAllFilter(APPCONSTANTS.SCHEMAS.REACTIONS_SCHEMA, requestBody)
  }

  // Services

  saveReactionToServer(post: PostSchema, userId: string, type: number) {
    let reactionSaveData = {
      post: post._id,
      user: userId,
      type: type
    }

    this.postsService.saveOne(APPCONSTANTS.SCHEMAS.REACTIONS_SCHEMA, reactionSaveData).subscribe(resReact => {
      let responseReaction = resReact as ReactionSchema
      let queryUpdate = {
        "query": {
          "_id": post._id
        },
        "data": {
          "$push": {
            "reactions": responseReaction._id
          },
          "$inc": { "reactionCount": 1 }
        }
      }

      this.postsService.updateOne(APPCONSTANTS.SCHEMAS.POSTS_SCHEMA, queryUpdate).subscribe((resPost) => {
        console.log(resPost);
        this.saveAnonymousReaction(responseReaction, post)
        this.addReactionToObs(responseReaction)
      })
    })
  }

  updateReactionToServer(reaction: ReactionSchema, type: number) {
    let updateData = {
      query: {
        _id: reaction._id
      },
      data: {
        type: type
      }
    }

    this.postsService.updateOne(APPCONSTANTS.SCHEMAS.REACTIONS_SCHEMA, updateData).subscribe((res) => {
      console.log(res);
    })
  }

  countReactionType(reactions: ReactionSchema[], type: number): number {
    return reactions.filter(element => element.type === type).length
  }

  orderReactions(reactions: ReactionSchema[]){
    //emit each reaction
    const source = from(reactions);
    //group by type
    const grouped = source.pipe(
        groupBy(reaction => reaction.type),
        // return each item in group as array
        mergeMap(group => group.pipe(first()))
    );

    let result = []
    const subscribe = grouped.subscribe(val => { 
      result.push(val) 
    });
    let ordered = result.sort(this.compareFn)
    return ordered
  }
  
  compareFn = (a, b) => {
    if (a.length < b.length)
      return 1;
    if (a.length > b.length)
      return -1;
    return 0;
  };

  /***************************************** */

  get getObservableReactionList(): Observable<ReactionSchema[]> { return this._observableReactionList.asObservable() }

  addReactionToObs(reaction: ReactionSchema) {
    this._reactionList.push(reaction);
    this._observableReactionList.next(this._reactionList);
  }

  public assingElementsToObservable(reactions: ReactionSchema[]){
    this._reactionList = reactions
    this._observableReactionList.next(this._reactionList);
  }
}