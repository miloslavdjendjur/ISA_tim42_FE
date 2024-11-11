import { Component, OnInit } from '@angular/core';
import { Post } from '../../posts/model/post-view.model';
import { PostService } from '../../posts/post.service';

@Component({
  selector: 'app-post-feed',
  templateUrl: 'post-feed.component.html',
  styleUrl: 'post-feed.component.css'
})
export class PostFeedComponent implements OnInit{
  posts: Post[] = [];

  constructor(private service: PostService) {}
  ngOnInit(): void {
    this.service.getAllPosts().subscribe({
      next: (result: Post[]) =>{
        this.posts = result;
        console.log(result);
      },
      error:( err: any) =>{
        console.log(err);
      }
    })
  }

}
