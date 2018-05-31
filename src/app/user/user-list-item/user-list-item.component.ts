import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user.model';
import { UserService } from 'src/app/user/user.service';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.css']
})
export class UserListItemComponent implements OnInit {
  currentUserId: string;
  @Input() user: User;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  getCurrentUserId() {
    this.currentUserId = this.authService.currentUserId;
  }

}
