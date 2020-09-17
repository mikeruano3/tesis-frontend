import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home-tabs/home-tabs.module').then( m => m.HomeTabsPageModule)
  },
  { 
    path: 'home', 
    redirectTo: 'home-tabs', 
    pathMatch: 'full'
  },
  { 
    path: 'home-tabs', 
    loadChildren: () => import('./home-tabs/home-tabs.module').then( m => m.HomeTabsPageModule)
  },
  {
    path: 'courses',
    loadChildren: () => import('./course-mgt/list-course/list-course.module').then( m => m.ListCoursePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./users/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./users/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./users/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'users-home',
    loadChildren: () => import('./users/users-home/users-home.module').then( m => m.UsersHomePageModule)
  },
  {
    path: 'home-landing',
    loadChildren: () => import('./home-landing/home-landing.module').then( m => m.HomeLandingPageModule)
  },
  {
    path: 'career-overview',
    loadChildren: () => import('./career-mgt/career-overview/career-overview.module').then( m => m.CareerOverviewPageModule)
  },
  {
    path: 'post-list',
    loadChildren: () => import('./posts/post-list/post-list.module').then( m => m.PostListPageModule)
  },
  {
    path: 'post-editor',
    loadChildren: () => import('./posts/post-editor/post-editor.module').then( m => m.PostEditorPageModule)
  },
  {
    path: 'post-viewer',
    loadChildren: () => import('./posts/post-viewer/post-viewer.module').then( m => m.PostViewerPageModule)
  },
  {
    path: 'comment-modal',
    loadChildren: () => import('./posts/post-card/comment-modal/comment-modal.module').then( m => m.CommentModalPageModule)
  },
  {
    path: 'career-category',
    loadChildren: () => import('./career-display/career-category/career-category.module').then( m => m.CareerCategoryPageModule)
  },
  {
    path: 'career-item',
    loadChildren: () => import('./career-display/career-item/career-item.module').then( m => m.CareerItemPageModule)
  },
  {
    path: 'generic-card-list',
    loadChildren: () => import('./generic-card-list/generic-card-list.module').then( m => m.GenericCardListPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
