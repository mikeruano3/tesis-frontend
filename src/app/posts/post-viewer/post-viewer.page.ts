import { Component, OnInit } from '@angular/core';
import { PostSchema } from 'src/app/schemas/post';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-viewer',
  templateUrl: './post-viewer.page.html',
  styleUrls: ['./post-viewer.page.scss'],
})
export class PostViewerPage implements OnInit {
  post: PostSchema
  isFullView:boolean

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.post = this.router.getCurrentNavigation().extras.state.post;
        this.isFullView = this.router.getCurrentNavigation().extras.state.isFullView;
      }
    });
   }

  ngOnInit() {
  }

}
