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
            parentCategory: parentCategory._id,
            categoryKeyword: APPCONSTANTS.CATEGORIES.CAREERS,
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
            case APPCONSTANTS.CATEGORIES.CAREER_SECTIONS.MATERIAL_ESTUDIO:
                query = {
                    categoryKeyword: APPCONSTANTS.CATEGORIES.UNIVERSITIES
                }
                this.redirectToSelectUniversity(parentPost, APPCONSTANTS.HELPER_CARRER_REDIRECTIONS.MATERIAL_ESTUDIO, query, lastProps)
                break;
            case APPCONSTANTS.CATEGORIES.CAREER_SECTIONS.PAGINAS_OFICIALES:
                query = {
                    categoryKeyword: APPCONSTANTS.CATEGORIES.UNIVERSITIES
                }
                this.redirectToSelectUniversity(parentPost, APPCONSTANTS.HELPER_CARRER_REDIRECTIONS.PAGINAS_OFICIALES, query, lastProps)
                break;
             case APPCONSTANTS.CATEGORIES.CAREER_SECTIONS.PENSUM_ESTUDIOS:
                query = {
                    categoryKeyword: APPCONSTANTS.CATEGORIES.UNIVERSITIES
                }
                this.redirectToSelectUniversity(parentPost, APPCONSTANTS.HELPER_CARRER_REDIRECTIONS.PENSUM_ESTUDIOS, query, lastProps)
                break;
            case APPCONSTANTS.CATEGORIES.CAREER_SECTIONS.AREAS_TRABAJO:
                this.redirectToAreasTrabajo(parentPost, lastProps)
                break;                
            case APPCONSTANTS.CATEGORIES.CAREER_SECTIONS.EXPERIENCIAS_EGRESADOS:
                this.redirectToExperiencias(parentPost, lastProps)
                break;
            case APPCONSTANTS.CATEGORIES.CAREER_SECTIONS.RECURSOS_UTILES:
                this.redirectToRecursosUtiles(parentPost, lastProps)
                break;                
            case APPCONSTANTS.CATEGORIES.CAREER_SECTIONS.CONSEJOS:
                this.redirectToConsejos(parentPost, lastProps)
                break;
            default:
                break;
        }        
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

    /*** GENERIC CARD LIST  ****/

    public redirectToMaterialDeEstudio(parentCategory:CategorySchema, lastProps:GenericCardProps){
        let material_parentCategory_id = lastProps.lastParentInfo?.parentCategory 
        let material_university = parentCategory._id
        let material_title = lastProps.lastProps.upperTitle
        
        let requestBody:GenericFilterBody = {} as GenericFilterBody
        requestBody.query = {
            postCategory: material_parentCategory_id, // buscar carrera
            postClasification: APPCONSTANTS.CATEGORIES.CAREER_SECTIONS.MATERIAL_ESTUDIO,
            university: material_university
        }
        requestBody.populate = 'reactions'
        requestBody.populate2 = 'user'
        
        let navigationExtras: NavigationExtras = {
            state: {
                requestBody: requestBody,
                newPostCategoryId: material_parentCategory_id,
                newPostClasification: APPCONSTANTS.CATEGORIES.CAREER_SECTIONS.MATERIAL_ESTUDIO,
                newPostUniversity: material_university,
                pageTitle: 'Material de Estudio',
                pageSubTitle: material_title
            }
        };
        this.router.navigate([this.postListRoute], navigationExtras);
    }

    public redirectToPaginasOficiales(parentCategory: CategorySchema, lastProps: GenericCardProps){
        let reqBody:GenericFilterBody = {} as GenericFilterBody
        let material_university = parentCategory._id

        reqBody.query = {
            parentCategory: lastProps?.lastParentInfo?.parentCategory,
            categoryKeyword: APPCONSTANTS.CATEGORIES.CAREER_SECTIONS.PAGINAS_OFICIALES,
            university: material_university
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
        let material_university = parentCategory._id

        reqBody.query = {
            parentCategory: lastProps?.lastParentInfo?.parentCategory,
            categoryKeyword: APPCONSTANTS.CATEGORIES.CAREER_SECTIONS.PENSUM_ESTUDIOS,
            university: material_university
        }

        let props:GenericCardProps = {
            collectionKeyword: APPCONSTANTS.SCHEMAS.CATEGORIES_SCHEMA,
            requestBody: reqBody,
            pageTitle: 'Pénsum de Estudios',
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

    /**** POST LIST  *****/

    redirectToRecursosUtiles(parentPost:CategorySchema, lastProps:GenericCardProps){
        let requestBody:GenericFilterBody = {} as GenericFilterBody
        requestBody.query = {
            postCategory: parentPost.parentCategory,
            postClasification:  APPCONSTANTS.CATEGORIES.CAREER_SECTIONS.RECURSOS_UTILES
        }
        requestBody.populate = 'reactions'
        requestBody.populate2 = 'user'
        
        let navigationExtras: NavigationExtras = {
            state: {
                requestBody: requestBody,
                newPostCategoryId: parentPost.parentCategory,
                newPostClasification:  APPCONSTANTS.CATEGORIES.CAREER_SECTIONS.RECURSOS_UTILES,
                pageTitle: 'Recursos Útiles',
                pageSubTitle: lastProps.upperTitle
            }
        };
        this.router.navigate([this.postListRoute], navigationExtras);
    }

    redirectToAreasTrabajo(parentPost:CategorySchema, lastProps:GenericCardProps){
        let requestBody:GenericFilterBody = {} as GenericFilterBody
        requestBody.query = {
            postCategory: parentPost.parentCategory,
            postClasification:  APPCONSTANTS.CATEGORIES.CAREER_SECTIONS.AREAS_TRABAJO
        }
        requestBody.populate = 'reactions'
        requestBody.populate2 = 'user'
        
        let navigationExtras: NavigationExtras = {
            state: {
                requestBody: requestBody,
                newPostCategoryId: parentPost.parentCategory,
                newPostClasification:  APPCONSTANTS.CATEGORIES.CAREER_SECTIONS.AREAS_TRABAJO,
                pageTitle: 'Áreas de Trabajo',
                pageSubTitle: lastProps.upperTitle
            }
        };
        this.router.navigate([this.postListRoute], navigationExtras);
    }

    redirectToExperiencias(parentPost:CategorySchema, lastProps: GenericCardProps){
        let requestBody:GenericFilterBody = {} as GenericFilterBody
        requestBody.query = {
            postCategory: parentPost.parentCategory,
            postClasification: APPCONSTANTS.CATEGORIES.CAREER_SECTIONS.EXPERIENCIAS_EGRESADOS
        }
        requestBody.populate = 'reactions'
        requestBody.populate2 = 'user'
        
        let navigationExtras: NavigationExtras = {
            state: {
                requestBody: requestBody,
                newPostCategoryId: parentPost.parentCategory,
                newPostClasification: APPCONSTANTS.CATEGORIES.CAREER_SECTIONS.EXPERIENCIAS_EGRESADOS,
                pageTitle: 'Experiencias de Egresados',
                pageSubTitle: lastProps.upperTitle
            }
        };
        this.router.navigate([this.postListRoute], navigationExtras);
    }

    redirectToConsejos(parentPost:CategorySchema, lastProps: GenericCardProps){
        let requestBody:GenericFilterBody = {} as GenericFilterBody
        requestBody.query = {
            postCategory: parentPost.parentCategory,
            postClasification: APPCONSTANTS.CATEGORIES.CAREER_SECTIONS.CONSEJOS
        }
        requestBody.populate = 'reactions'
        requestBody.populate2 = 'user'
        
        let navigationExtras: NavigationExtras = {
            state: {
                requestBody: requestBody,
                newPostCategoryId: parentPost.parentCategory,
                newPostClasification: APPCONSTANTS.CATEGORIES.CAREER_SECTIONS.CONSEJOS,
                pageTitle: 'Consejos sobre la carrera',
                pageSubTitle: lastProps.upperTitle
            }
        };
        this.router.navigate([this.postListRoute], navigationExtras);
    }

    /**** CARRER GIVEN A UNIVERSITY LIST ****/
    public redirectToCareersOrderedByUniversity(parentCategory: CategorySchema, lastProps: GenericCardProps){
        let reqBody:GenericFilterBody = {} as GenericFilterBody
        reqBody.query = {
            categoryKeyword: APPCONSTANTS.CATEGORIES.CAREERS,
            university: parentCategory
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
        this.router.navigate([this.genericCardListRoute +'/7' ], navigationExtras);
    }
}