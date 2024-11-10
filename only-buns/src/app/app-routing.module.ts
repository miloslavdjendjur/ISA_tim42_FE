// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './layout/home/home.component';
import { PostFeedComponent } from './post/post-feed/post-feed.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'all-posts', component: PostFeedComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
