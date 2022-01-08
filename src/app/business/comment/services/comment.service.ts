import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Comment } from '../models/comment';
import { CommentCreate } from '../models/comment-create';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private commentsUrl: string = environment.apiUrl + 'comments';

  constructor(private httpClient: HttpClient) { }

  createComment(comment: CommentCreate): Observable<CommentCreate> {
    return this.httpClient.post<CommentCreate>(`${this.commentsUrl}`, comment);
  }

  listAll(): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(this.commentsUrl);
  }

  listAllByPostId(id: number): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`${this.commentsUrl}/byPost/${id}`);
  }

  findById(id: number): Observable<Comment> {
    return this.httpClient.get<Comment>(`${this.commentsUrl}/${id}`);
  }

  update(comment: Comment): Observable<Comment> {
    return this.httpClient.put<Comment>(`${this.commentsUrl}/${comment.id}`, comment);
  }

  deleteById(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.commentsUrl}/${id}`);
  }

}
