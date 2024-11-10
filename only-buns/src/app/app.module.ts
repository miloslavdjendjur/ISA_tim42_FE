import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component'; 
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './layout/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
//import { provideHttpClient, withFetch } from '@angular/common/http';
import { PostFeedComponent } from './post/post-feed/post-feed.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { provideHttpClient, withFetch } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PostFeedComponent,
    CreatePostComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    //provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }