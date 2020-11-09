import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebFillPasswordPage } from './web-fill-password.page';

const routes: Routes = [
  {
    path: '',
    component: WebFillPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebFillPasswordPageRoutingModule {}
