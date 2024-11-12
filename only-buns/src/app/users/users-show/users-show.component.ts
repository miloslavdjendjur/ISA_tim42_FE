import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../model/user.model';
import { AuthService } from '../../posts/auth.service';

@Component({
  selector: 'app-users-show',
  templateUrl: './users-show.component.html',
  styleUrl: './users-show.component.css'
})
export class UsersShowComponent implements OnInit {

  users: User[] = [];
  userId: number | null = null;
  constructor(private service: UserService, private authService: AuthService){}
  ngOnInit(): void {
    const user = this.authService.getLoggedInUser();
      if (user) {
        this.userId = user.id;

        this.service.getAllUsers(this.userId).subscribe({
          next: (result : User[]) =>{
            this.users = result;
          },
          error: (err: any) => {
            console.log(err);
          }
        }) ;
      }
      else{
        console.log("Nema ulogovanog usera");
      }

  }

}
