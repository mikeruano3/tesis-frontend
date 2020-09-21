import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostListPageRoutingModule } from './post-list-routing.module';

import { PostListPage } from './post-list.page';
import { PostCardComponentModule } from '../post-card/post-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostListPageRoutingModule,
    PostCardComponentModule
  ],
  declarations: [PostListPage]
})
export class PostListPageModule {}
