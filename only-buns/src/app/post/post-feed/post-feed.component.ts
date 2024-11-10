import { Component, OnInit } from '@angular/core';
import { Post } from '../../model/post.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.css'
})
export class PostFeedComponent implements OnInit{
  posts: Post[] = [];

  constructor(private service: PostService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
