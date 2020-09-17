import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CareerCategoryPage } from './career-category.page';

const routes: Routes = [
  {
    path: '',
    component: CareerCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CareerCategoryPageRoutingModule {}
