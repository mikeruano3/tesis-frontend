import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfficialPagesPage } from './official-pages.page';

const routes: Routes = [
  {
    path: '',
    component: OfficialPagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfficialPagesPageRoutingModule {}
