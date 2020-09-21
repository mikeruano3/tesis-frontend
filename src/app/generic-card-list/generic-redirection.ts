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

    public redirectToCareersOrderedByCategory(parentCategory: CategorySchema){
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
          
            fixedData:[],
            dataFilterProperty: 'title',
            dataFilterPlaceholder: 'Buscar carrera...',
            redirectToDesc: APPCONSTANTS.CATEGORIES.CAREER_DASHBOARDS
        }
        let navigationExtras: NavigationExtras = {
            state: props
        };
        this.router.navigate([this.genericCardListRoute +'/1' ], navigationExtras);
    }

    public redirectToSingleCareerDashboard(parentCategory: CategorySchema){
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
            upperSubtitle: 'Toca en un item para ver más',
            
            link1:null,
            link2:null,

            avatarImgProperty: null,
            avatarTitleProperty: null,
            avatarSubtitleProperty: null,
            
            imgProperty: 'topImg',
            titleProperty: 'title',
            subtitleProperty: null,
          
            fixedData:fixedData.getList(),
            dataFilterProperty: null,
            dataFilterPlaceholder: null,
            redirectToDesc: APPCONSTANTS.CATEGORIES.CAREER_CLASIFFIED_POSTS
        }
        let navigationExtras: NavigationExtras = {
            state: props
        };
        this.router.navigate([this.genericCardListRoute + '/2'], navigationExtras);
    }

    public redirectToCareerSubmenus(parentPost:CategorySchema){
        console.log('PARENT POST');
        console.log(parentPost);
        
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
                newPostClasification: parentPost._id
            }
        };
        this.router.navigate([this.postListRoute], navigationExtras);
    }



}