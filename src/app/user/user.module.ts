import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserListItemComponent } from './user-list-item/user-list-item.component';
import { UserService } from './user.service';

import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { PostModule } from '../post/post.module';

const routes: Routes = [
  { path: "dashboard", component: UserDashboardComponent, data: { title: "My dashboard"}},
  { path: "users", component: UserListComponent, data: { title: "Users"}},
  { path: "users/:id", component: UserDetailComponent, data: { title: "profile"}},
];

@NgModule({
  imports: [
    CommonModule,
    PostModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    UserListItemComponent
  ],
  declarations: [UserDashboardComponent, UserDetailComponent, UserListComponent, UserListItemComponent],
  providers: [UserService]
})
export class UserModule { }
