import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../model/user.model';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user?: User;
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const userId = +params['id'];
      this.loadUserProfile(userId);
    });
  }

  loadUserProfile(id: number): void {
    this.userService.getShowUserById(id).subscribe({
      next: (data) => (this.user = data),
      error: (err) => (this.errorMessage = 'Failed to load user profile: ' + err.message),
    });
  }
}
