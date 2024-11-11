import { Component } from '@angular/core';
import { AuthService } from '../../posts/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  dropdownOpen = false;

  constructor(private authService: AuthService, private router: Router) {}

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    console.log('Logout clicked');  // Check if click works
    this.authService.logout();  // Clear session
    console.log('Navigating to login...');  // Confirm before navigation
    this.router.navigateByUrl('/login');  // Redirect to login page
  }
  
}
