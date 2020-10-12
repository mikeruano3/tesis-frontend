import { PostSchema } from 'src/app/schemas/post';
import { ReactionSchema } from 'src/app/schemas/reaction';

export const REACTIONKEYS = {
    reactionLikekey: 1,
    reactionLoveKey: 2,
    reactionHahaKey: 3,
    reactionWowKey: 4,
    reactionSadKey: 5,
    reactionAngryKey: 6,
    localUserReactionsKey: 'AnonymousReactions'
}

export interface localSavedReaction {
    post: PostSchema
    reaction: ReactionSchema
}