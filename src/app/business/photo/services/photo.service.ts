import { Photo } from './../models/photo';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PhotoDetail } from '../models/photo-detail';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private photosUrl: string = environment.apiUrl + 'photos';

  constructor(private httpClient: HttpClient) { }

  uploadPhotoToAWS(photo: Photo, file: File): Observable<HttpEvent<{}>> {
    let data: FormData = new FormData();
    const userBlob = new Blob([JSON.stringify(photo)], { type: "application/json"});
    data.append('photo', userBlob);
    data.append('file', file);

    const newRequest = new HttpRequest('POST', `${this.photosUrl}/uploadPhoto`, data, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.httpClient.request(newRequest);
  }

  listAll(): Observable<PhotoDetail[]> {
    return this.httpClient.get<PhotoDetail[]>(this.photosUrl);
  }

  listAllByPostId(id: number): Observable<PhotoDetail[]> {
    return this.httpClient.get<PhotoDetail[]>(`${this.photosUrl}/byPost/${id}`);
  }

  findById(id: number): Observable<PhotoDetail> {
    return this.httpClient.get<PhotoDetail>(`${this.photosUrl}/${id}`);
  }

  deleteById(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.photosUrl}/${id}`);
  }

}
