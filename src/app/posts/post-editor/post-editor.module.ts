import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
//import { CKEditorModule } from '@ckeditor/ckeditor5-build-classic';
import { IonicModule } from '@ionic/angular';
import { PostEditorPageRoutingModule } from './post-editor-routing.module';
import { PostEditorPage } from './post-editor.page';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostEditorPageRoutingModule,
    CKEditorModule,
    IonicStorageModule.forRoot()
  ],
  declarations: [PostEditorPage]
})
export class PostEditorPageModule {}
