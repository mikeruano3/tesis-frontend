import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'home', 
    pathMatch: 'full'
  },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule) },
  {
    path: 'courses',
    loadChildren: () => import('./courses/list-course/list-course.module').then( m => m.ListCoursePageModule)
  },
  {
    path: 'users/login',
    loadChildren: () => import('./users/login/login.module').then( m => m.LoginPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
