import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenericCardListPage } from './generic-card-list.page';

const routes: Routes = [
  {
    path: '',
    component: GenericCardListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenericCardListPageRoutingModule {}
