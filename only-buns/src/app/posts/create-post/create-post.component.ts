import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  createPostForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder, private postService: PostService) {
    this.createPostForm = this.fb.group({
      description: ['', Validators.required],
      // Removed address, latitude, and longitude fields
    });
  }

  ngOnInit(): void {
    // No map initialization
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.createPostForm.valid) {
      const formData = new FormData();
      formData.append('description', this.createPostForm.get('description')?.value);
      
      const fileInput = document.getElementById('file') as HTMLInputElement;
      if (fileInput.files && fileInput.files[0]) {
        formData.append('file', fileInput.files[0]);
      }

      // Add optional fields with default values if they are not present
      formData.append('latitude', ''); // Leave empty; backend will use default if missing
      formData.append('longitude', ''); // Leave empty; backend will use default if missing
      formData.append('address', ''); // Leave empty; backend will use default if missing

      // Add userId
      formData.append('userId', '1'); // Replace '1' with the actual user ID if available

      this.postService.createPost(formData).subscribe(
        response => {
          console.log('Post created successfully', response);
        },
        error => {
          console.error('Error creating post', error);
        }
      );
    }
  }

  
}
