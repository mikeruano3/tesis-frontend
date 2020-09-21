import { CategorySchema } from './category';
import { PostSchema } from './post';

export class FileSchema {
    _id: string
    associatedPost: PostSchema
    postCategory: CategorySchema
    createdAt: string
    title: string
    description: string
    link: string
}