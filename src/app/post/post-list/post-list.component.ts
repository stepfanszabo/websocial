import { Component, OnInit } from '@angular/core';

import { Observable, from } from '@sanity/observable';
import { Post } from 'src/app/post/post.model';
import { PostService } from 'src/app/post/post.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: Observable<Post[]>;

  constructor(private postService: PostService, private userService: UserService) { }

  ngOnInit() {
    this.posts = this.postService.getPosts();
  }

}
