import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeLandingPage } from './home-landing.page';

const routes: Routes = [
  {
    path: '',
    component: HomeLandingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeLandingPageRoutingModule {}
