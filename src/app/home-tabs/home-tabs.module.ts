import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeTabsPageRoutingModule } from './home-tabs-routing.module';

import { HomeTabsPage } from './home-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeTabsPageRoutingModule
  ],
  declarations: [HomeTabsPage]
})
export class HomeTabsPageModule {}
