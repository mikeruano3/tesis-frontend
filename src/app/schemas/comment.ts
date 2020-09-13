import { UserSchema } from './user'
import { PostSchema } from './post'

export class CommentSchema {
    _id: string
    user: UserSchema
    parentPost: PostSchema
    parentComment: CommentSchema
    createdAt: string
    title: string
    content: string
}