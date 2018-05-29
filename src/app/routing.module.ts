import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { SharedModule } from './shared/shared.module';

const routes: Routes = [
  { path: 'signin', component: SigninComponent, data: { title: 'SignIn'} },
  { path: 'signup', component: SignupComponent, data: { title: 'SignUp'} },
  { path: 'reset-password', component: ResetPasswordComponent, data: { title: 'ResetPassword'} },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    SharedModule
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
