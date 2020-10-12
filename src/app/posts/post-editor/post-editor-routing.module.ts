import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostEditorPage } from './post-editor.page';
import { FilesHandlerComponent } from './files/files-handler.component';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path: '',
    component: PostEditorPage
  }
];

@NgModule({
  declarations: [
    FilesHandlerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule, FilesHandlerComponent ],
  providers: [ FileChooser ]
})
export class PostEditorPageRoutingModule {}
