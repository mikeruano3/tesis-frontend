import { CategorySchema } from '../schemas/category';
import { APPCONSTANTS } from '../constants/app-constants';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Injectable } from '@angular/core';
import { GenericCardProps } from './generic-card-list.page';
import { GenericFilterBody } from '../shared/services/data.service';
import { FixedCourseDescription } from '../schemas/fixedCourseDescription';

export class GenericRedirection {
    genericCardListRoute:string = '/generic-card-list'
    postListRoute:string = '/post-list'

    constructor(private route: ActivatedRoute, private router: Router){}

    public redirectToCareersOrderedByCategory(parentCategory: CategorySchema, lastProps: GenericCardProps){
        let reqBody:GenericFilterBody = {} as GenericFilterBody
        reqBody.query = {
            parentCategory: parentCategory._id
        }

        let props:GenericCardProps = {
            collectionKeyword: APPCONSTANTS.SCHEMAS.CATEGORIES_SCHEMA,
            requestBody: reqBody,
            pageTitle: 'Carrera',
            colSize:12,
            upperImageSrc: parentCategory.topImg,
            upperTitle: parentCategory.title,
            upperSubtitle: 'Toca en un item para ver más',
            
            link1:null,
            link2:null,

            avatarImgProperty: null,
            avatarTitleProperty: null,
            avatarSubtitleProperty: null,
            
            imgProperty: 'topImg',
            titleProperty: 'title',
            subtitleProperty: 'subtitle',
            browserlink: null,

            fixedData:[],
            dataFilterProperty: 'title',
            dataFilterPlaceholder: 'Buscar carrera...',
            redirectToDesc: APPCONSTANTS.CATEGORIES.CAREER_DASHBOARDS,
            lastParentInfo: parentCategory,
            lastProps: lastProps
        }
        let navigationExtras: NavigationExtras = {
            state: props
        };
        this.router.navigate([this.genericCardListRoute +'/1' ], navigationExtras);
    }

    public redirectToSingleCareerDashboard(parentCategory: CategorySchema, lastProps: GenericCardProps){
        let reqBody:GenericFilterBody = {} as GenericFilterBody
        // Assing to subcategory parent course
        let fixedData:FixedCourseDescription = new FixedCourseDescription(parentCategory)

        let props:GenericCardProps = {
            collectionKeyword: APPCONSTANTS.SCHEMAS.CATEGORIES_SCHEMA,
            requestBody: reqBody,
            pageTitle: 'Panel de Carrera',
            colSize:6,
            upperImageSrc: parentCategory.topImg,
            upperTitle: parentCategory.title,
            upperSubtitle: 'Información General',
            
            link1:null,
            link2:null,

            avatarImgProperty: null,
            avatarTitleProperty: null,
            avatarSubtitleProperty: null,
            
            imgProperty: 'topImg',
            titleProperty: 'title',
            subtitleProperty: null,
            browserlink: null,

            fixedData:fixedData.getList(),
            dataFilterProperty: null,
            dataFilterPlaceholder: null,
            redirectToDesc: APPCONSTANTS.CATEGORIES.CAREER_CLASIFFIED_POSTS,
            lastParentInfo: parentCategory,
            lastProps: lastProps
        }
        let navigationExtras: NavigationExtras = {
            state: props
        };
        this.router.navigate([this.genericCardListRoute + '/2'], navigationExtras);
    }

    public redirectToCareerSubmenus(parentPost:CategorySchema, lastProps:GenericCardProps){
        let query
        switch (parentPost._id) {
            case APPCONSTANTS.CATEGORIES.CAREER_SECTIONS.MATERIAL:
                query = {
                    categoryKeyword: APPCONSTANTS.CATEGORIES.UNIVERSITIES
                }
                this.redirectToSelectUniversity(parentPost, APPCONSTANTS.CATEGORIES.CAREER_REDIRECTIONS.MATERIAL_ESTUDIO, query, lastProps)
                break;
            case APPCONSTANTS.CATEGORIES.CAREER_SECTIONS.PAGINAS:
                query = {
                    categoryKeyword: APPCONSTANTS.CATEGORIES.UNIVERSITIES
                }
                this.redirectToSelectUniversity(parentPost, APPCONSTANTS.CATEGORIES.CAREER_REDIRECTIONS.PAGINAS_OFICIALES, query, lastProps)
                break;
            case APPCONSTANTS.CATEGORIES.CAREER_SECTIONS.EXPERIENCIAS:
                this.redirectToOpinions(parentPost, lastProps.upperTitle, 'Experiencias de Egresados', lastProps)
                break;
            case APPCONSTANTS.CATEGORIES.CAREER_SECTIONS.CONSEJOS:
                this.redirectToOpinions(parentPost, lastProps.upperTitle, 'Consejos Útiles', lastProps)
                break;
            default:
                break;
        }        
    }

    redirectToOpinions(parentPost:CategorySchema, pageTitle:string, pageSubTitle:string, lastProps: GenericCardProps){
        let requestBody:GenericFilterBody = {} as GenericFilterBody
        requestBody.query = {
            postCategory: parentPost.parentCategory,
            postClasification: parentPost._id
        }
        requestBody.populate = 'reactions'
        
        let navigationExtras: NavigationExtras = {
            state: {
                requestBody: requestBody,
                newPostCategoryId: parentPost.parentCategory,
                newPostClasification: parentPost._id,
                pageTitle: pageTitle,
                pageSubTitle: pageSubTitle
            }
        };
        this.router.navigate([this.postListRoute], navigationExtras);
    }

    public redirectToSelectUniversity(parentCategory: CategorySchema, nextRedirection:string, requestQuery: any, 
        lastProps: GenericCardProps){
        
        let reqBody:GenericFilterBody = {} as GenericFilterBody
        reqBody.query = requestQuery

        let props:GenericCardProps = {
            collectionKeyword: APPCONSTANTS.SCHEMAS.CATEGORIES_SCHEMA,
            requestBody: reqBody,
            pageTitle: 'Universidades',
            colSize:12,
            upperImageSrc: parentCategory.topImg,
            upperTitle: parentCategory.title,
            upperSubtitle: 'Selecciona la Universidad',
            
            link1:null,
            link2:null,

            avatarImgProperty: 'avatarImg',
            avatarTitleProperty: 'avatarTitle',
            avatarSubtitleProperty: null,
            
            imgProperty: null,
            titleProperty: null,
            subtitleProperty: null,
            browserlink: null,

            fixedData:[],
            dataFilterProperty: 'title',
            dataFilterPlaceholder: 'Buscar universidad...',
            redirectToDesc: nextRedirection,
            lastParentInfo: parentCategory,
            lastProps: lastProps
        }
        let navigationExtras: NavigationExtras = {
            state: props
        };
        this.router.navigate([this.genericCardListRoute +'/4' ], navigationExtras);
    }

    redirectToMaterialDeEstudio(parentPost:CategorySchema, lastProps:GenericCardProps){
        let material_parentCategory_id = lastProps.lastParentInfo?.parentCategory 
        let material_university = parentPost._id
        let material_title = lastProps.lastProps.upperTitle
        
        let requestBody:GenericFilterBody = {} as GenericFilterBody
        requestBody.query = {
            postCategory: material_parentCategory_id, // buscar carrera
            postClasification: APPCONSTANTS.CATEGORIES.CAREER_SECTIONS.MATERIAL,
            university: material_university
        }
        requestBody.populate = 'reactions'
        console.log(requestBody);
        
        
        let navigationExtras: NavigationExtras = {
            state: {
                requestBody: requestBody,
                newPostCategoryId: material_parentCategory_id,
                newPostClasification: APPCONSTANTS.CATEGORIES.CAREER_SECTIONS.MATERIAL,
                newPostUniversity: material_university,
                pageTitle: 'Material de Estudio',
                pageSubTitle: material_title
            }
        };
        this.router.navigate([this.postListRoute], navigationExtras);
    }

    public redirectToPaginasOficiales(parentCategory: CategorySchema, lastProps: GenericCardProps){
        let reqBody:GenericFilterBody = {} as GenericFilterBody
        
        reqBody.query = {
            parentCategory: lastProps?.lastParentInfo?.parentCategory,
            categoryKeyword: APPCONSTANTS.CATEGORIES.PAGINAS_OFICIALES
        }

        let props:GenericCardProps = {
            collectionKeyword: APPCONSTANTS.SCHEMAS.CATEGORIES_SCHEMA,
            requestBody: reqBody,
            pageTitle: 'Páginas oficiales',
            colSize:12,
            upperImageSrc: parentCategory.topImg,
            upperTitle: lastProps.lastProps.upperTitle,
            upperSubtitle: parentCategory.title,
            
            link1:null,
            link2:null,

            avatarImgProperty: 'avatarImg',
            avatarTitleProperty: 'avatarTitle',
            avatarSubtitleProperty: 'avatarSubtitle',
            
            imgProperty: null,
            titleProperty: 'title',
            subtitleProperty: null,
            browserlink: 'link',

            fixedData:[],
            dataFilterProperty: null,
            dataFilterPlaceholder: null,
            redirectToDesc: null,
            lastParentInfo: parentCategory,
            lastProps: lastProps
        }
        let navigationExtras: NavigationExtras = {
            state: props
        };
        this.router.navigate([this.genericCardListRoute +'/5' ], navigationExtras);
    }

    public redirectToPensumCarrera(parentCategory: CategorySchema, lastProps: GenericCardProps){
        let reqBody:GenericFilterBody = {} as GenericFilterBody
        
        reqBody.query = {
            parentCategory: lastProps?.lastParentInfo?.parentCategory,
            categoryKeyword: APPCONSTANTS.CATEGORIES.PAGINAS_OFICIALES
        }

        let props:GenericCardProps = {
            collectionKeyword: APPCONSTANTS.SCHEMAS.CATEGORIES_SCHEMA,
            requestBody: reqBody,
            pageTitle: 'Páginas oficiales',
            colSize:12,
            upperImageSrc: parentCategory.topImg,
            upperTitle: lastProps.lastProps.upperTitle,
            upperSubtitle: parentCategory.title,
            
            link1:null,
            link2:null,

            avatarImgProperty: 'avatarImg',
            avatarTitleProperty: 'avatarTitle',
            avatarSubtitleProperty: 'avatarSubtitle',
            
            imgProperty: null,
            titleProperty: 'title',
            subtitleProperty: null,
            browserlink: 'link',

            fixedData:[],
            dataFilterProperty: null,
            dataFilterPlaceholder: null,
            redirectToDesc: null,
            lastParentInfo: parentCategory,
            lastProps: lastProps
        }
        let navigationExtras: NavigationExtras = {
            state: props
        };
        this.router.navigate([this.genericCardListRoute +'/6' ], navigationExtras);
    }


}