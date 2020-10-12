import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersHomePageRoutingModule } from './users-home-routing.module';

import { UsersHomePage } from './users-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersHomePageRoutingModule
  ],
  declarations: [UsersHomePage]
})
export class UsersHomePageModule {}
