import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface LoginResponse {
  token: string;
  id: number;
  email: string;
  username: string;
  fullName: string;
  role: string;
  activated: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';  // Update the URL if necessary
  private loggedInUser = new BehaviorSubject<LoginResponse | null>(null);
  private loggedInUserSubject = new BehaviorSubject<LoginResponse | null>(null);
  public loggedInUser$ = this.loggedInUserSubject.asObservable();
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('loggedInUser', JSON.stringify(response));  // Store user details in localStorage
        this.loggedInUserSubject.next(response);
      })
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.loggedInUser.next(null);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getLoggedInUser(): LoginResponse | null {
    const userJson = localStorage.getItem('loggedInUser');
    return userJson ? JSON.parse(userJson) : null;
  }

  activateAccount(token: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/activate?token=${token}`);
  }
}
