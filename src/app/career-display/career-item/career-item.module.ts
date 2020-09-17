import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CareerItemPageRoutingModule } from './career-item-routing.module';

import { CareerItemPage } from './career-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CareerItemPageRoutingModule
  ],
  declarations: [CareerItemPage]
})
export class CareerItemPageModule {}
