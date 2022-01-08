import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postsUrl: string = environment.apiUrl + 'posts';

  constructor(private httpClient: HttpClient) { }

  createPost(post: Post): Observable<Post> {
    return this.httpClient.post<Post>(`${this.postsUrl}`, post);
  }

  listAll(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.postsUrl);
  }

  findById(id: number): Observable<Post> {
    return this.httpClient.get<Post>(`${this.postsUrl}/${id}`);
  }

  update(post: Post): Observable<Post> {
    return this.httpClient.put<Post>(`${this.postsUrl}/${post.id}`, post);
  }

  deleteById(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.postsUrl}/${id}`);
  }

}
