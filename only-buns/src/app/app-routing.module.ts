// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './infrastructure/auth/login/login.component';
import { RegisterComponent } from './infrastructure/auth/register/register.component';
import { PostFeedComponent } from './posts/post-feed/post-feed.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { ActivationComponent } from './infrastructure/auth/activation/activation.component';
import { UsersShowComponent } from './users/users-show/users-show.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: PostFeedComponent }, 
  { path: 'all-posts', component: PostFeedComponent},
  { path: 'create-post', component: CreatePostComponent },  
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'activate', component: ActivationComponent },
  { path: 'all-users',component: UsersShowComponent},
  { path: 'profile/:id', component: UserProfileComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
