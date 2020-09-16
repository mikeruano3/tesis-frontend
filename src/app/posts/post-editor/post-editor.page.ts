import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { PostsService } from '../post.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { PostSchema } from 'src/app/schemas/post';
import { postsKeyword } from 'src/app/schemas/SchemaNameConstants';
import { UserSchema } from 'src/app/schemas/user';

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

  constructor(
    private postsService: PostsService,
    public tokenStorageService: TokenStorageService 
  ) { 
    this.config = {uiColor: '#99000', height: 500};
  }

  ngOnInit() { 
    this.user = this.tokenStorageService.getUserData()
  }

  savePostToServer(){
    const tmpContent = this.editorData
    let commentData:PostSchema = {} as PostSchema
    commentData.user = this.user || undefined
    commentData.content = tmpContent
    commentData.childComments = [];
    commentData.postAsComment = {
      parentCommentOrPost: undefined,
      mentionedUser: undefined
    }
    console.log(commentData);
    
    this.postsService.saveOne(postsKeyword, commentData).subscribe(resPost => {
      console.log(resPost);
      this.editorData = null
    })
  }

}
