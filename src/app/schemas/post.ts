import { PostCategorySchema } from './postCategory';
import { UserSchema } from './user';
import { FileSchema } from './fileSchema';
import { ReactionSchema } from './reaction';
import { CommentSchema } from './comment';

export class PostSchema {
    _id: string
    user: UserSchema
    postCategory: PostCategorySchema
    createdAt: string
    title: string
    content: string
    files: FileSchema
    reactions: ReactionSchema
    comments: CommentSchema
    sharedCount: number
}