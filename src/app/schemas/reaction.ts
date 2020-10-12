import { UserSchema } from './user'
import { PostSchema } from './post'

export class ReactionSchema {
    _id: string
    post: PostSchema
    user: UserSchema
    type: number
}