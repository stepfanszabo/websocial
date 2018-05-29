import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

const routes: Routes = [
  { path: 'signin', component: SigninComponent, data: { title: 'SignIn'} },
  { path: 'signup', component: SignupComponent, data: { title: 'SignUp'} },
  { path: 'reset-password', component: ResetPasswordComponent, data: { title: 'ResetPassword'} },
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [SigninComponent, SignupComponent, ResetPasswordComponent]
})
export class AuthModule { }
