import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CareerCategoriesPageRoutingModule } from './career-categories-routing.module';

import { CareerCategoriesPage } from './career-categories.page';
import { GenericCardListPageModule } from '../generic-card-list/generic-card-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CareerCategoriesPageRoutingModule,
    GenericCardListPageModule
  ],
  declarations: [CareerCategoriesPage]
})
export class CareerCategoriesPageModule {}
