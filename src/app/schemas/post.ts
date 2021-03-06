import { CategorySchema } from './category';
import { UserSchema } from './user';
import { FileSchema } from './fileSchema';
import { ReactionSchema } from './reaction';

export class PostSchema {
    _id: string
    user: UserSchema
    postCategory: string
    postClasification: string
    university:string
    createdAt: string
    title: string
    content: string
    files: string[]
    reactions: ReactionSchema[]
    reportedCount: number
    childComments : PostSchema[]
    postAsComment: {
        parentCommentOrPost : PostSchema,
        mentionedUser : UserSchema
    }
}