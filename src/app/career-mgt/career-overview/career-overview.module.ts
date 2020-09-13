import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CareerOverviewPageRoutingModule } from './career-overview-routing.module';

import { CareerOverviewPage } from './career-overview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CareerOverviewPageRoutingModule
  ],
  declarations: [CareerOverviewPage]
})
export class CareerOverviewPageModule {}
