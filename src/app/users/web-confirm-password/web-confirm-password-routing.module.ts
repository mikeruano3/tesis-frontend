import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebConfirmPasswordPage } from './web-confirm-password.page';

const routes: Routes = [
  {
    path: '',
    component: WebConfirmPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebConfirmPasswordPageRoutingModule {}
