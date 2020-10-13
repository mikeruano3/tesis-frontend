import { RoleSchema } from './role'

export class UserSchema {
    _id: string
    username: string
    email: string
    password: string
    fullname: string
    profession: string
    direction: string
    university: string
    image: string
    role: RoleSchema
    createdAt: string
}