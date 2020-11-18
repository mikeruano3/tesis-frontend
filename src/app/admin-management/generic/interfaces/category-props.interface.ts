import { CategorySchema } from 'src/app/schemas/category';

export interface CategoryGenericProps {
    pageTitle:string
    origin:string

    fetchParentCategoryFilterKeyWord:string
    localStorageRefName: string
    newCategoryKeyword:string
    editCategoryData:CategorySchema

    parentCategory:boolean
    university:boolean
    avatarImg:boolean
    avatarTitle:boolean
    avatarSubtitle:boolean
    topImg:boolean
    title: boolean
    subtitle: boolean
    link:boolean
    pinned:boolean
}