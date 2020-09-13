import { UserSchema } from './user'

export class ReactionSchema {
    _id: string
    user: UserSchema
    count: number
    type: number
}