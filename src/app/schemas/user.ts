import { RoleSchema } from './role'

export class UserSchema {
    _id: string
    username: string
    email: string
    password: string
    fullname: string
    profesion: string
    city: string
    image: string
    role: RoleSchema
    createdAt: string
}