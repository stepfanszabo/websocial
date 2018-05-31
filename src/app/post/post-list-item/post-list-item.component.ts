import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/post/post.model';
import { AuthService } from 'src/app/core/auth.service';
import { PostService } from 'src/app/post/post.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.css']
})
export class PostListItemComponent implements OnInit {

  editing = false;

  @Input() post: Post;
  constructor(private postService: PostService, private userService: UserService, public authService: AuthService) { }

  ngOnInit() {
  }

  delete(id: string) {
    this.postService.delete(id);
  }

  update() {
    const formData = {
      content: this.post.content,
      isPublic: this.post.isPublic
    }

    this.postService.update(this.post.id, formData);
    this.editing = false;
  }

  like(val: number) {
    if(this.post.id) {
      console.log(val);
      this.postService.update(this.post.id, { likes: val + 1 });
    }
  }

  getUserPhoto(id: string) {
    return this.userService.getUserPhoto(id);
  }

}
