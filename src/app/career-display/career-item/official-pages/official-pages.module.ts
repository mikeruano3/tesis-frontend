import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfficialPagesPageRoutingModule } from './official-pages-routing.module';

import { OfficialPagesPage } from './official-pages.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfficialPagesPageRoutingModule
  ],
  declarations: [OfficialPagesPage]
})
export class OfficialPagesPageModule {}
