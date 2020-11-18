import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminManagementPage } from './admin-management.page';

const routes: Routes = [
  {
    path: '',
    component: AdminManagementPage
  },
  {
    path: 'add-category',
    loadChildren: () => import('./generic/add-category/add-category.module').then( m => m.AddCategoryPageModule)
  },
  {
    path: 'list-category',
    loadChildren: () => import('./generic/list-category/list-category.module').then( m => m.ListCategoryPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class AdminManagementPageRoutingModule {}
