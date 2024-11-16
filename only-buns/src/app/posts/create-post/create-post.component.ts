import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  createPostForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  userId: number | null = null;
  userName: string = "PERO";
  currentUser: any;
  locationSelected: { lat: number; lng: number } | null = null;

  constructor(private fb: FormBuilder, private postService: PostService, private authService: AuthService,  private router: Router) {
    this.createPostForm = this.fb.group({
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getLoggedInUser();
    if (this.currentUser) {
      this.userId = this.currentUser.id;
      this.userName = this.currentUser.username;
    } else {
      console.warn('Logged-in user is null');
    }
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
  onLocationSelected(location: { lat: number; lng: number }) {
    console.log('Odabrana lokacija:', location);
    this.locationSelected = location;
  }

  onSubmit(): void {
    if (this.createPostForm.valid && this.userId) { 
      const formData = new FormData();
      formData.append('description', this.createPostForm.get('description')?.value);
  
      const fileInput = document.getElementById('file') as HTMLInputElement;
      if (fileInput.files && fileInput.files[0]) {
        formData.append('file', fileInput.files[0]);
      }
  
      formData.append('userId', this.userId.toString()); // Append userId
  
      // You can include these if needed, or let the backend handle defaults
      formData.append('latitude', ''); 
      formData.append('longitude', ''); 
      formData.append('address', ''); 
  
      this.postService.createPost(formData).subscribe(
        response => {
          console.log('Post created successfully', response);
          // Optionally reset the form or navigate to another page
          this.createPostForm.reset(); 
          this.imagePreview = null; 
          this.router.navigate(['/']);
        },
        error => {
          console.error('Error creating post', error);
          // Handle errors, e.g., display an error message to the user
        }
      );
    } else {
      console.error('User ID is missing or form is invalid');
      // Handle the case where userId is missing or form is invalid
    }
  }
}
