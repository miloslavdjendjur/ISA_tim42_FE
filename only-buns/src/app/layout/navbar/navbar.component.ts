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
  isAuthenticated = false; 
  isAdmin = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.loggedInUser$.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    console.log('Logout clicked');  
    this.authService.logout();
    console.log('Navigating to login...');  
    this.router.navigateByUrl('/login');  
  }
 
  loginRedirect() {
    this.router.navigateByUrl('/login');
  }
}
