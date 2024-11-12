import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component'; 
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './layout/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { LoginComponent } from './infrastructure/auth/login/login.component';
import { RegisterComponent } from './infrastructure/auth/register/register.component';
import { ActivationComponent } from './infrastructure/auth/activation/activation.component';
import { HttpClientModule } from '@angular/common/http';
import { PostFeedComponent } from './posts/post-feed/post-feed.component';
import { CommonModule } from '@angular/common';
import { UsersShowComponent } from './users/users-show/users-show.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PostFeedComponent,
    CreatePostComponent,
    LoginComponent,       
    RegisterComponent,
    ActivationComponent,
    UsersShowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }