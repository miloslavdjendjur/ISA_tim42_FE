import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './model/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';  // Update the URL if necessary

  constructor(private http : HttpClient){}
  
  getAllUsers(adminId : number) : Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl + "/all/" + adminId);
  }
}
