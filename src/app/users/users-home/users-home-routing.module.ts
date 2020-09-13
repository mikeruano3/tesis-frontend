import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersHomePage } from './users-home.page';

const routes: Routes = [
  {
    path: '',
    component: UsersHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersHomePageRoutingModule {}
