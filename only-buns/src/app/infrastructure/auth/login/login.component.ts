import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../posts/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
  
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.email, this.password).subscribe(
      () => {
        const user = this.authService.getLoggedInUser();
        console.log('Logged in user:', user);
        this.router.navigate(['/']);  // Redirect to the home page or dashboard
      },
      error => {
        this.errorMessage = 'Invalid login credentials';
      }
    );
  }
}
