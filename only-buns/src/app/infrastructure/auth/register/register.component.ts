import { Component } from '@angular/core';
import { AuthService } from '../../../posts/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  successMessage = '';
  errorMessage = '';

  constructor(private authService: AuthService) {}

  register(): void {
    const userData = { username: this.username, email: this.email, password: this.password };
    this.authService.register(userData).subscribe(
      () => {
        this.successMessage = 'Registration successful! Please check your email for an activation link.';
      },
      error => {
        this.errorMessage = 'Registration failed. Please try again.';
      }
    );
  }
}
