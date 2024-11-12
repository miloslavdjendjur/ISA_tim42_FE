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
    this.authService.loggedInUser$.subscribe(
      user => {
        this.currentUser = user;
        this.userId = this.currentUser.id;
        this.userName = this.currentUser.userName;
      },
      error => {
        console.error('Failed to fetch logged in user:', error);
      }
    );
    this.service.getAllPosts().subscribe({
      next: (result: Post[]) => {
        this.posts = result.sort((a, b) => {
          const dateA = a.createdDate ? new Date(a.createdDate).getTime() : 0;
          const dateB = b.createdDate ? new Date(b.createdDate).getTime() : 0;
          return dateA - dateB;
      });
      
        //console.log(result);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
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
          post.comments = comments;
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
          userId: -1,
          postId: postId,
          userName: this.userName
        };
      
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
        this.service.toggleLike(postId, -1).subscribe({
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
