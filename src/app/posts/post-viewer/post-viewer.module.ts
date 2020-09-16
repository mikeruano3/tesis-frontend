import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostViewerPageRoutingModule } from './post-viewer-routing.module';

import { PostViewerPage } from './post-viewer.page';
import { PostCardComponent } from '../post-card/post-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostViewerPageRoutingModule
  ],
  declarations: [PostViewerPage, PostCardComponent]
})
export class PostViewerPageModule {}
