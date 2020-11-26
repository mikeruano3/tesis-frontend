import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WebFillPasswordPageRoutingModule } from './web-fill-password-routing.module';

import { WebFillPasswordPage } from './web-fill-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    WebFillPasswordPageRoutingModule
  ],
  declarations: [WebFillPasswordPage]
})
export class WebFillPasswordPageModule {}
