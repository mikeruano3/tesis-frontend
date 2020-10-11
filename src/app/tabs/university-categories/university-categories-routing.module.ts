import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UniversityCategoriesPage } from './university-categories.page';

const routes: Routes = [
  {
    path: '',
    component: UniversityCategoriesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UniversityCategoriesPageRoutingModule {}
