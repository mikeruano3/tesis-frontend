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
        //loadChildren: () => import('../career-mgt/career-overview/career-overview.module').then(m => m.CareerOverviewPageModule)
        
      },
      {
        path: 'course-list',
        loadChildren: () => import('../course-mgt/list-course/list-course.module').then(m => m.ListCoursePageModule)
      },
      {
        path: 'users-home',
        loadChildren: () => import('../users/users-home/users-home-routing.module').then(m => m.UsersHomePageRoutingModule)
      },
      {
        path: 'universities',
        loadChildren: () => import('../posts/post-list/post-list-routing.module').then(m => m.PostListPageRoutingModule)
      },
      {
        path: 'contact',
        loadChildren: () => import('../career-display/career-item/career-item.module').then(m => m.CareerItemPageModule)
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
export class HomeTabsPageRoutingModule {}
