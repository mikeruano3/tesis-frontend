import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CareerItemPage } from './career-item.page';

const routes: Routes = [
  {
    path: '',
    component: CareerItemPage
  },
  {
    path: 'official-pages',
    loadChildren: () => import('./official-pages/official-pages.module').then( m => m.OfficialPagesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CareerItemPageRoutingModule {}
