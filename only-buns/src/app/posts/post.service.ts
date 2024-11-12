import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostDTO } from './model/post.model';
import { Post } from './model/post-view.model';
import { Comment } from './model/comment.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:8080/api/posts'; 

  constructor(private http: HttpClient) { }

  createPost(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }  

  getAllPosts() : Observable<Post[]>{
    return this.http.get<Post[]>(this.apiUrl + "/all");
  }
  getAllComments(id : number) : Observable<Comment[]>{
    return this.http.get<Comment[]>(this.apiUrl + "/all-comments/" + id);
  }
  deletePost(id: number) : Observable<void>{
    return this.http.delete<void>(this.apiUrl + "/" + id);
  }
  addComment(comment : Comment) : Observable<Post>{
    return this.http.put<Post>(this.apiUrl + "/add-comment",comment);
  }
}
