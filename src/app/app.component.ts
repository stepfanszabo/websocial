import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private authService: AuthService){}

  signout() {
    this.authService.signOut();
  }

  getUserPhoto():string {
    return this.authService.currentUserPhoto;
  }

  getUserName():string {
    return this.authService.currentUserName;
  }
}
