import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListCoursePageRoutingModule } from './list-course-routing.module';

import { ListCoursePage } from './list-course.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ListCoursePageRoutingModule
  ],
  declarations: [ListCoursePage]
})
export class ListCoursePageModule {}
