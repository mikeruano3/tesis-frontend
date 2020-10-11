import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UniversityCategoriesPageRoutingModule } from './university-categories-routing.module';

import { UniversityCategoriesPage } from './university-categories.page';
import { GenericCardListPageModule } from '../../generic-card-list/generic-card-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UniversityCategoriesPageRoutingModule,
    GenericCardListPageModule
  ],
  declarations: [UniversityCategoriesPage]
})
export class UniversityCategoriesPageModule {}
