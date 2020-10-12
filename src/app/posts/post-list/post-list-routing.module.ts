import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostListPage } from './post-list.page';

const routes: Routes = [
  {
    path: '',
    component: PostListPage
  },
  {
    path: 'new',
    loadChildren: () => import('../post-editor/post-editor.module').then(m => m.PostEditorPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostListPageRoutingModule {}
