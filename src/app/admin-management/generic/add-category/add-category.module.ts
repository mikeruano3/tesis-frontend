import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropComponent } from '../../../shared/image-cropper/image-cropper';
import { IonicModule } from '@ionic/angular';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { AddCategoryPageRoutingModule } from './add-category-routing.module';
import { AddCategoryPage } from './add-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddCategoryPageRoutingModule,
    ImageCropperModule,
    IonicStorageModule.forRoot()
  ],
  declarations: [AddCategoryPage, ImageCropComponent],
  providers: [ FileChooser ]
})
export class AddCategoryPageModule {}
