import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PostService } from '../../posts/post.service';
import { AuthService } from '../auth.service';
import { Comment } from '../model/comment.model';

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

  constructor(private service: PostService, private authService: AuthService) {
    const currentUser = this.authService.getLoggedInUser();
    if (currentUser) {
      this.userId = currentUser.id;
      this.username = currentUser.username || 'default';
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

      this.service.addComment(commentToAdd).subscribe({
        next: () => {
          if (this.post.comments) {
            this.post.comments.push(commentToAdd);
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
}
