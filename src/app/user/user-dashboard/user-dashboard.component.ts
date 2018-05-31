import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user/user.model';
import { AuthService } from '../../core/auth.service';
import { UserService } from 'src/app/user/user.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  editing = false;
  user: User;

  constructor(private authService: AuthService, private userService: UserService, private location: Location, private router: Router) { }

  ngOnInit() {
    // console.log(this.authService.authenticated);
    // if(!this.authService.authenticated) {
    //   this.router.navigate(['/signin']);
    // }
    this.getUser();
  }

  getUser() {
    this.authService.user.subscribe(user => this.user = user);
  }

  updateProfile() {
    return this.userService.updateProfileName(this.user.displayName);
  }

  updateUser() {
    const data = {
      website: this.user.website || null,
      address: this.user.address || null,
      birthDate: this.user.birthDate || null,
      bio: this.user.bio || null
    }
    return this.userService.updateUserData(data)
            .then(() => alert("Successful save"));
  }

  goBack() {
    this.location.back();
  }
}
