import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostEditorPageRoutingModule } from './post-editor-routing.module';

import { PostEditorPage } from './post-editor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostEditorPageRoutingModule
  ],
  declarations: [PostEditorPage]
})
export class PostEditorPageModule {}
