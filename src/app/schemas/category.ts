export class CategorySchema {
    _id: string
    parentCategory : string
    childCategories : []
    university: string
    categoryKeyword : string
    avatarImg : string
    avatarTitle : string
    avatarSubtitle : string
    topImg : string
    title : string
    subtitle : string
    link:string
    avatarImgFileRef: any
    topImgFileRef: any
}