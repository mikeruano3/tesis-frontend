import { CategorySchema } from './category';
import { PostSchema } from './post';

export class FileSchema {
    _id: string
    postCategory:string
    associatedPost: string
    fileName: string
    fileType: string
    firestoreId: string
    firestoreFolder: string
    firestoreDownloadLink: any
}