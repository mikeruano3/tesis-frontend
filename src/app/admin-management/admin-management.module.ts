import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FileChooser } from '@ionic-native/file-chooser/ngx';

import { AdminManagementPageRoutingModule } from './admin-management-routing.module';

import { AdminManagementPage } from './admin-management.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AdminManagementPageRoutingModule
  ],
  declarations: [AdminManagementPage],
  providers: [ FileChooser ]
})
export class AdminManagementPageModule {}
