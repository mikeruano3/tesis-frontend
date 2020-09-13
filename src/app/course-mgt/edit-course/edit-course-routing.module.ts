import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCoursePage } from './edit-course.page';

const routes: Routes = [
  {
    path: '',
    component: EditCoursePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCoursePageRoutingModule {}
