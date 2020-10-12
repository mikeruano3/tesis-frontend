import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCoursePageRoutingModule } from './edit-course-routing.module';

import { EditCoursePage } from './edit-course.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditCoursePageRoutingModule
  ],
  declarations: [EditCoursePage]
})
export class EditCoursePageModule {}
