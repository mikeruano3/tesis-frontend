import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { PostsService } from '../post.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { PostSchema } from 'src/app/schemas/post';
import { UserSchema } from 'src/app/schemas/user';
import { APPCONSTANTS } from 'src/app/constants/app-constants';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploadService } from 'src/app/file-upload/upload.service';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.page.html',
  styleUrls: ['./post-editor.page.scss'],
})
export class PostEditorPage implements OnInit {
  public Editor = ClassicEditor;
  editorData:any = ''
  config
  user:UserSchema
  newPostCategoryId:string = ''
  newPostClasification:string = ''

  constructor(
    private postsService: PostsService,
    public tokenStorageService: TokenStorageService,
    private route: ActivatedRoute, private router: Router,
    private fileUploadService: FileUploadService
  ) { 
    this.config = {uiColor: '#99000', height: 500};
    this.route.queryParams.subscribe(params => {
      let navigationState = this.router.getCurrentNavigation().extras.state
      if (navigationState) 
      {
        this.newPostCategoryId = navigationState.newPostCategoryId,
        this.newPostClasification = navigationState.newPostClasification
      }
    });
  }

  ngOnInit() { 
    this.user = this.tokenStorageService.getUserData()
  }

  savePostToServer(){
    const tmpContent = this.editorData
    let newPost:PostSchema = {} as PostSchema
    newPost.user = this.user || undefined
    newPost.postCategory = this.newPostCategoryId
    newPost.postClasification = this.newPostClasification
    newPost.title = "TEST... CHANGE"
    newPost.content = tmpContent
    newPost.childComments = [];
    newPost.postAsComment = {
      parentCommentOrPost: undefined,
      mentionedUser: undefined
    }
    this.postsService.saveOne(APPCONSTANTS.SCHEMAS.POSTS_SCHEMA, newPost).subscribe(resPost => {
      console.log(resPost);
      this.editorData = null
    })
  }

  async openFileChooser(){
    await this.fileUploadService.chooseFile()
  }

}
