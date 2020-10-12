import { Component, OnInit } from '@angular/core';
import { PostSchema } from 'src/app/schemas/post';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../post.service';
import { FileSchema } from 'src/app/schemas/fileSchema';
import { GenericFilterBody } from 'src/app/shared/services/data.service';
import { APPCONSTANTS } from 'src/app/constants/app-constants';

@Component({
  selector: 'app-post-viewer',
  templateUrl: './post-viewer.page.html',
  styleUrls: ['./post-viewer.page.scss'],
})
export class PostViewerPage implements OnInit {
  post: PostSchema
  isFullView:boolean
  postFiles: FileSchema[] = []

  constructor(private route: ActivatedRoute, private router: Router, private postsService: PostsService) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.post = this.router.getCurrentNavigation().extras.state.post;
        this.isFullView = this.router.getCurrentNavigation().extras.state.isFullView;
      }
    });
   }

  ngOnInit() {
    this.getPostFiles(this.post.files)
  }

  async getPostFiles(files:string[]){
    if(this.post?.files?.length < 1){
      return
    }
    if(!this.post._id){
      return
    }
    let reqBody:GenericFilterBody = {} as GenericFilterBody
    reqBody.query = { _id : this.post?._id}
    reqBody.populate = 'files'
    reqBody.projection =  { files: 1 }
    let result = await this.postsService.findAllFilter(APPCONSTANTS.SCHEMAS.POSTS_SCHEMA, reqBody).toPromise()
    if(result[0]?.files){
      this.post.files = result[0]?.files
    }
  }

}
