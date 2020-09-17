import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CareerCategoryPageRoutingModule } from './career-category-routing.module';

import { CareerCategoryPage } from './career-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CareerCategoryPageRoutingModule
  ],
  declarations: [CareerCategoryPage]
})
export class CareerCategoryPageModule {}
