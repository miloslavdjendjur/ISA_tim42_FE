// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './layout/home/home.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'create-post', component: CreatePostComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
