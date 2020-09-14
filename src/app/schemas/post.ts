import { PostCategorySchema } from './postCategory';
import { UserSchema } from './user';
import { FileSchema } from './fileSchema';
import { ReactionSchema } from './reaction';

export class PostSchema {
    _id: string
    user: UserSchema
    postCategory: PostCategorySchema
    createdAt: string
    title: string
    content: string
    files: FileSchema[]
    reactions: ReactionSchema[]
    sharedCount: number
    postAsComment: {
        parentCommentOrPost : PostSchema,
        childComments : PostSchema,
        mentionedUser : UserSchema
    }
}