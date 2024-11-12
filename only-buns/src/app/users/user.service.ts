import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './model/user.model';
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http : HttpClient){}
  
  getAllUsers(adminId : number) : Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl + "/all/" + adminId);
  }
  filterUsers(adminId: number, name?: string, surname?: string, email?: string, minPosts?: number, maxPosts?: number): Observable<User[]> {
    const filterCriteria = {
        adminId: adminId,
        name: name,
        surname: surname,
        email: email,
        minPosts: minPosts,
        maxPosts: maxPosts,
    };

    return this.http.post<User[]>(this.apiUrl + "/filter/" + adminId,filterCriteria);
}
}