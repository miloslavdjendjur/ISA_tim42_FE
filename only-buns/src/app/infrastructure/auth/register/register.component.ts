import { Component } from '@angular/core';
import { AuthService } from '../../../posts/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email = '';
  username = '';
  password = '';
  confirmPassword = '';
  fullName = '';
  address = '';
  successMessage = '';
  errorMessage = '';

  constructor(private authService: AuthService) {}

  get emailError() {
    return !this.email || !this.email.includes('@');
  }

  get usernameError() {
    return this.username.length < 3;
  }

  get passwordMismatchError() {
    return this.password !== this.confirmPassword;
  }

  register(): void {
    if (this.emailError || this.usernameError || this.passwordMismatchError) {
      this.errorMessage = 'Please fix the errors before submitting.';
      return;
    }
  
    const userData = {
      email: this.email,
      username: this.username,
      password: this.password,
      fullName: this.fullName,
      address: this.address
    };
  
    this.authService.register(userData).subscribe(
      (response) => {
        if (response && response.message) {
          this.successMessage = response.message;
          this.errorMessage = '';
        }
      },
      (error) => {
        if (error.status === 409 && error.error.error) {
          this.errorMessage = error.error.error; // Handle conflict error message
        } else {
          this.errorMessage = 'Registration failed. Please try again.';
        }
        this.successMessage = '';
      }
    );
  }
  
}
