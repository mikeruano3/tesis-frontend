import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeLandingPageRoutingModule } from './home-landing-routing.module';

import { HomeLandingPage } from './home-landing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeLandingPageRoutingModule
  ],
  declarations: [HomeLandingPage]
})
export class HomeLandingPageModule {}
