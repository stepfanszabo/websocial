import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from 'src/app/post/post.service';
import { Post } from 'src/app/post/post.model';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.css']
})
export class PostDashboardComponent implements OnInit {

  postForm: FormGroup;

  constructor(private postService: PostService, private formBuilder: FormBuilder, private auth: AuthService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm () {
    this.postForm = this.formBuilder.group({
      content: "",
      isPublic: false
    });
  }

  savePost() {
    const formData: Post = {
      userid: this.auth.currentUserId,
      userName: this.auth.authState.displayName,
      content: this.postForm.get("content").value,
      isPublic: this.postForm.get("isPublic").value,
      date: new Date().toISOString(),
      likes: 0
    };

    if(!this.postForm.untouched) {
      var newPost = this.postService.create(formData);
      this.postForm.reset();

      return newPost;
    }
    this.postForm.reset();
  }

}
