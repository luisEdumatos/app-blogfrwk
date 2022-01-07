import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private clientsUrl: string = environment.apiUrl + 'client';

  constructor(private httpClient: HttpClient) { }


}
