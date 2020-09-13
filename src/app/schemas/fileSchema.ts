import { PostCategorySchema } from './postCategory';
import { PostSchema } from './post';

export class FileSchema {
    _id: string
    associatedPost: PostSchema
    postCategory: PostCategorySchema
    createdAt: string
    title: string
    description: string
    link: string
}