import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostService } from './post.service';
import { PostDashboardComponent } from './post-dashboard/post-dashboard.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostListItemComponent } from './post-list-item/post-list-item.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: "posts", component: PostListComponent, data: { title: "Posts"}}
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [PostDashboardComponent],
  declarations: [PostDashboardComponent, PostListComponent, PostListItemComponent],
  providers: [PostService]
})
export class PostModule { }
