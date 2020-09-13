import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListCoursePage } from './list-course.page';

const routes: Routes = [
  {
    path: '',
    component: ListCoursePage,
    pathMatch: 'full'
  },
  {
    path: 'add-course',
    loadChildren: () => import('../add-course/add-course.module').then( m => m.AddCoursePageModule)
  },
  {
    path: 'edit-course/:id',
    loadChildren: () => import('../edit-course/edit-course.module').then( m => m.EditCoursePageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListCoursePageRoutingModule {}
