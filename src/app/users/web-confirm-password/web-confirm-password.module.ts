import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WebConfirmPasswordPageRoutingModule } from './web-confirm-password-routing.module';

import { WebConfirmPasswordPage } from './web-confirm-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WebConfirmPasswordPageRoutingModule
  ],
  declarations: [WebConfirmPasswordPage]
})
export class WebConfirmPasswordPageModule {}
