import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostViewerPage } from './post-viewer.page';

const routes: Routes = [
  {
    path: '',
    component: PostViewerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostViewerPageRoutingModule {}
