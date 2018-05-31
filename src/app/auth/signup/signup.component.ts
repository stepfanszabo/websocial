import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from '@sanity/observable';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from '../../core/auth.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css', '../auth.style.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  hide = true;

  constructor(public formBuilder: FormBuilder, private auth: AuthService, private router: Router, private userService: UserService ) { 
    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['',
        [
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
          Validators.minLength(6),
          Validators.maxLength(20)
        ]
      ]
    })
  }

  ngOnInit() {
  }
  
  get name() {
    return this.signUpForm.get('name');
  }

  get email() {
    return this.signUpForm.get('email');
  }
  
  get password() {
    return this.signUpForm.get('password');
  }

  signUp() {
    return this.auth.emailSignUp(this.email.value, this.password.value)
              .then(user => {
                this.userService.updateProfileName(this.name.value);
                console.log(this.signUpForm.valid);
                if(this.signUpForm.valid) {
                  this.router.navigate(['/dashboard']);
                }
              })
  }
}
