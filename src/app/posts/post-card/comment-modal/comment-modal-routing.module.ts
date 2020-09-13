import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommentModalPage } from './comment-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CommentModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommentModalPageRoutingModule {}
