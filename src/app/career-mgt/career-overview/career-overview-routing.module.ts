import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CareerOverviewPage } from './career-overview.page';

const routes: Routes = [
  {
    path: '',
    component: CareerOverviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CareerOverviewPageRoutingModule {}
