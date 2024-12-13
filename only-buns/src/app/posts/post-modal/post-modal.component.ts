import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.css']
})
export class PostModalComponent {
  @Input() post: any; // Post object passed from parent
  @Output() close = new EventEmitter<void>();

  closeModal(): void {
    this.close.emit();
  }

  addComment(): void {
    console.log('Adding a comment...');
    // Implement comment functionality here
  }
}
