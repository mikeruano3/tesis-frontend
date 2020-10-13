import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeTabsPage } from './home-tabs.page';

const routes: Routes = [
  {
    path: 'tablinks',
    component: HomeTabsPage,
    children: [
      {
        path: 'home-landing',
        loadChildren: () => import('../home-landing/home-landing.module').then(m => m.HomeLandingPageModule)
      },
      {
        path: 'career-list',
        loadChildren: () => import('../tabs/career-categories/career-categories.module').then(m => m.CareerCategoriesPageModule)
      },
      {
        path: 'users-home',
        loadChildren: () => import('../users/users-home/users-home-routing.module').then(m => m.UsersHomePageRoutingModule)
      },
      {
        path: 'universities',
        loadChildren: () => import('../tabs/university-categories/university-categories.module').then(m => m.UniversityCategoriesPageModule)
      },
      {
        path: 'contact',
        loadChildren: () => import('../posts/post-list/post-list-routing.module').then(m => m.PostListPageRoutingModule)
        //loadChildren: () => import('../course-mgt/list-course/list-course.module').then(m => m.ListCoursePageModule)
      },
      {
        path: '',
        redirectTo: '/tablinks/home-landing',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tablinks/home-landing',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeTabsPageRoutingModule { }
