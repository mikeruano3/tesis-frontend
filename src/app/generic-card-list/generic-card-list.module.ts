import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenericCardListPageRoutingModule } from './generic-card-list-routing.module';

import { GenericCardListPage } from './generic-card-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenericCardListPageRoutingModule
  ],
  declarations: [GenericCardListPage]
})
export class GenericCardListPageModule {}
