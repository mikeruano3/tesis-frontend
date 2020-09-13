import { Component, OnInit } from '@angular/core';
import { PostsService } from '../post.service';
import { PostSchema } from '../../schemas/post';
import { substractTimeZone } from 'src/app/shared/functions/localDate';
import { UserSchema } from 'src/app/schemas/user';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.page.html',
  styleUrls: ['./post-list.page.scss'],
})
export class PostListPage implements OnInit {
  posts: PostSchema[] = []
  maxStringLength = 50

  constructor(
    private postsService: PostsService
  ) {
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.postsService.findAll().subscribe((res) => {
      this.posts = res;
    })
  }

}
