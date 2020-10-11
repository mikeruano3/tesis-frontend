import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { PostsService } from '../post.service';
import { TokenStorageService } from '../../auth/token-storage.service';
import { PostSchema } from '../../schemas/post';
import { UserSchema } from '../../schemas/user';
import { APPCONSTANTS } from '../../constants/app-constants';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploadService } from '../../file-upload/drive-upload.service';
import { localFileData } from './files/local-file-data.interface';
import { UploadedFilesHandler } from './files/uploaded-file-transferer.interface';

export interface newPostProps{
  newPostCategoryId:string
  newPostClasification:string
  newPostUniversity:string
}

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.page.html',
  styleUrls: ['./post-editor.page.scss'],
})
export class PostEditorPage implements OnInit {
  public Editor = ClassicEditor;
  editorData:any = ''
  titleData:string = ''
  config
  user:UserSchema
  newPostCategoryId:string = null
  newPostClasification:string = null
  newPostUniversity:string = null
  uploadedFilesHandler:UploadedFilesHandler = { uploadedFilesShowToUser: [] }

  constructor(
    private postsService: PostsService,
    public tokenStorageService: TokenStorageService,
    private route: ActivatedRoute, private router: Router,
    private fileUploadService: FileUploadService
  ) { 
    this.config = {} //{uiColor: '#99000'};
    this.route.queryParams.subscribe(params => {
      let navigationState = this.router.getCurrentNavigation().extras.state
      if (navigationState) 
      {
        this.newPostCategoryId = navigationState.newPostCategoryId,
        this.newPostClasification = navigationState.newPostClasification,
        this.newPostUniversity = navigationState.newPostUniversity
      }
    });
  }

  ngOnInit() { 
    this.user = this.tokenStorageService.getUserData()
  }

  savePostToServer(){
    console.log(this.uploadedFilesHandler);

    const tmpContent = this.editorData
    let newPost:PostSchema = {} as PostSchema
    newPost.user = this.getLoggedInUserData()
    newPost.postCategory = this.newPostCategoryId
    newPost.postClasification = this.newPostClasification
    newPost.university = this.newPostUniversity
    newPost.title = this.titleData
    newPost.content = tmpContent
    newPost.childComments = [];
    newPost.postAsComment = {
      parentCommentOrPost: undefined,
      mentionedUser: undefined
    }
    this.postsService.saveOne(APPCONSTANTS.SCHEMAS.POSTS_SCHEMA, newPost).subscribe(resPost => {
      console.log(resPost);
      this.editorData = null
      this.titleData = ''
    })
  }

  getLoggedInUserData(){
    return undefined
  }

}
