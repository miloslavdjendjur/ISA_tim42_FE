import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PostService } from '../../posts/post.service';
import { AuthService } from '../auth.service';
import { Comment } from '../model/comment.model';
import { UserService } from '../../users/user.service';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.css']
})
export class PostModalComponent {
  @Input() post: any; // Post object passed from parent
  @Output() close = new EventEmitter<void>();
  userId: number | null = null;
  username: string = "default";
  errorMessage: string | null = null; 

  constructor(private postService: PostService, private authService: AuthService,  private userService: UserService) {
    const currentUser = this.authService.getLoggedInUser();
    if (currentUser) {
      this.userId = currentUser.id;
      this.username = currentUser.username || 'default';
    }
  }

  ngOnInit(): void {
    if (this.post) {
      this.loadComments(this.post.id);
    }
  }

  closeModal(): void {
    this.close.emit();
  }

  submitComment(postId: number, commentInput: HTMLInputElement): void {
    const commentText = commentInput.value.trim();
  
    if (commentText) {
      const commentToAdd: Comment = {
        text: commentText,
        createdTime: new Date().toISOString(),
        userId: this.userId || -1,
        postId: postId,
        username: this.username
      };
  
      this.postService.addComment(commentToAdd).subscribe({
        next: () => {
          if (this.post.comments) {
            this.post.comments.push(commentToAdd);
          }
          commentInput.value = '';
          this.errorMessage = null; // Clear any previous error
        },
        error: (err) => {
          if (err.status === 403) {
            if (err.error?.message === "You must follow the post's owner to comment.") {
              this.errorMessage = "You must follow the post's owner to comment.";
            } else if (err.error?.message === "You can only comment 60 times per hour.") {
              this.errorMessage = "You can only comment 60 times per hour.";
            } else {
              this.errorMessage = "Forbidden action.";
            }
          } else {
            this.errorMessage = "Failed to submit comment. Please try again.";
          }
        }
      });
    } else {
      console.log("Komentar ne može biti prazan");
    }
  }
  
  clearError(): void {
    this.errorMessage = null;
  }
  
  loadComments(postId: number): void {
    this.postService.getAllComments(postId).subscribe({
      next: (comments: Comment[]) => {
        const userRequests = comments.map((comment) =>
          this.userService.getShowUserById(comment.userId).toPromise()
        );

        Promise.all(userRequests).then((users) => {
          this.post.comments = comments.map((comment, index) => ({
            ...comment,
            username: users[index]?.username || 'Unknown',
            profileImagePath: users[index]?.profileImagePath || 'assets/default.jpg',
          })).sort((a, b) => {
            return new Date(a.createdTime).getTime() - new Date(b.createdTime).getTime();
          });
        });
      },
      error: (err: any) => {
        console.error('Failed to load comments:', err);
      },
    });
  }
}
