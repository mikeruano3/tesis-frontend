import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListCategoryPage } from './list-category.page';

const routes: Routes = [
  {
    path: '',
    component: ListCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListCategoryPageRoutingModule {}
