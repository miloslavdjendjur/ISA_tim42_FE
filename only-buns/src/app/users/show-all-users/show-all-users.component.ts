import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../user.service';
import { AuthService } from '../../posts/auth.service';

@Component({
  selector: 'app-show-all-users',
  templateUrl: './show-all-users.component.html',
  styleUrl: './show-all-users.component.css'
})
export class ShowAllUsersComponent implements OnInit {

    users: User[] = [];
    userId: number | null = null;
    isFollowing: boolean = false;

    constructor(private service: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getLoggedInUser();
    if(user !== null){
      this.userId = user.id;
      this.loadUsers();
    }
  }
  loadUsers(): void {
    if(this.userId !== null){
      this.service.getAllUsers(this.userId).subscribe({
        next: (result: User[]) => {
          this.users = result;
          console.log(this.users);
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    }
  }
  followUser(userToFollow : User): void{
    if(this.userId !== null){
      this.service.followUser(userToFollow,this.userId).subscribe({
        next:(result: User) =>{
          this.users = this.users.map(user => 
            user.id === result.id ? result : user
          );
          console.log(result);
        },
        error: (err: any) =>{
          console.log(err);
        }
      });
    }
  }
}
