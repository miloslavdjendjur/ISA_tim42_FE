import { Component, OnInit } from '@angular/core';
import { Post } from '../../posts/model/post-view.model';
import { PostService } from '../../posts/post.service';
import { Comment } from '../model/comment.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.css']
})
export class PostFeedComponent implements OnInit {
  posts: Post[] = [];
  showComments: { [key: number]: boolean } = {};
  userId: number | null = null;
  userName: string = "PERO";
  currentUser: any;
  constructor(private service: PostService, private authService: AuthService) {}
  

  ngOnInit(): void {
    this.currentUser = this.authService.getLoggedInUser();
      if (this.currentUser) {
        this.userId = this.currentUser.id;
        this.userName = this.currentUser.username;
      } else {
        console.warn('Logged-in user is null');
      }
    this.service.getAllPosts().subscribe({
      next: (result: Post[]) => {
          this.posts = result
              .map(post => ({
                  ...post,
                  imagePath: this.getImagePath(post.imagePath)
              }))
              .sort((a, b) => {
                  const dateA = a.createdDate ? new Date(a.createdDate).getTime() : 0;
                  const dateB = b.createdDate ? new Date(b.createdDate).getTime() : 0;
                  return dateA - dateB;
              });
          console.log('Posts with full image paths:', this.posts);
      },
      error: (err: any) => {
          console.error('Error fetching posts:', err);
      }
  });
  
  }

  getImagePath(imageUrl: string): string {
    return `http://localhost:8080${imageUrl}`;
  }

  loadComments(postId: number): void {
    if (this.showComments[postId]) {
      this.showComments[postId] = false;
      return;
    }

    this.service.getAllComments(postId).subscribe({
      next: (comments: Comment[]) => {
        const post = this.posts.find(p => p.id === postId);
        if (post) {
          post.comments = comments.sort((a, b) => {
            return new Date(a.createdTime).getTime() - new Date(b.createdTime).getTime();
          });
          this.showComments[postId] = true;
        }
      },
      error: (err: any) => {
        console.log('Failed to load comments:', err);
      }
    });
  }
  deletePost(id: number): void {
    this.service.deletePost(id).subscribe({
      next: () => {
        const index = this.posts.findIndex(post => post.id === id);
  
        if (index !== -1) {
          this.posts.splice(index, 1);
          //console.log(`Post with ID ${id} deleted successfully`);
        }
      },
      error: (error) => {
        console.error('Error deleting post:', error);
      }
    });
  }
  submitComment(postId: number, commentInput: HTMLInputElement): void {
    const commentText = commentInput.value.trim();
  
    if (commentText) {
      //const idOfUser = this.authService.getLoggedInUser()?.id;
      
        const commentToAdd: Comment = {
          text: commentText,
          createdTime: new Date().toISOString(),
          userId: this.userId || -1,
          postId: postId,
          userName: this.userName
        };
        //const localTime = new Date(commentToAdd.createdTime).toLocaleString();
        //console.log(localTime);
      this.service.addComment(commentToAdd).subscribe({
        next: () => {
          const post = this.posts.find(p => p.id === postId);
          if (post && post.comments) {
            post.comments.push(commentToAdd);
          }
          commentInput.value = '';
        },
        error: (err) => {
          console.error('Failed to submit comment:', err);
        }
      });
    } else {
      console.log('Komentar ne može biti prazan');
    }
  }
  toggleLike(postId: number): void {
    if (this.userId) {
        this.service.toggleLike(postId, this.userId).subscribe({
            next: (response: { message: string, likesCount: number }) => {
                console.log("Server response:", response.message);
                const post = this.posts.find(p => p.id === postId);
                if (post) {
                    post.likes = response.likesCount;
                }
            },
            error: (err) => {
                console.error("Error toggling like:", err);
            }
        });
    } else {
        alert('please log in');
        console.log("USER IS NOT LOGGED");
    }
  }
}
