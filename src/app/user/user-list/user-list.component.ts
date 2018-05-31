import { Component, OnInit } from '@angular/core';
import { Observable, from } from '@sanity/observable';
import { User } from '../user.model';

import { UserService } from '../user.service';
import { AuthService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: Observable<any[]>;

  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // if(!this.authService.authenticated) {
    //   this.router.navigate(['/signin']);
    // }
    this.getUsers();
  }

  getUsers() {
    this.users = this.userService.getUsers();
  }

}
