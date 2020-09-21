import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CareerCategoriesPage } from './career-categories.page';

const routes: Routes = [
  {
    path: '',
    component: CareerCategoriesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CareerCategoriesPageRoutingModule {}
