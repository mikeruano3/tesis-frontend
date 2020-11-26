import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListCategoryPageRoutingModule } from './list-category-routing.module';

import { ListCategoryPage } from './list-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListCategoryPageRoutingModule
  ],
  declarations: [ListCategoryPage]
})
export class ListCategoryPageModule {}
