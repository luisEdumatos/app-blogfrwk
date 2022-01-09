import { Component } from '@angular/core';
import { PhotoService } from './../services/photo.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../models/photo';
import { Post } from '../../post/models/post';

@Component({
  selector: 'app-photo',
  templateUrl: '../templates/photo.component.html',
  styleUrls: ['../styles/photo.component.css'],
})

export class PhotoComponent {
  _photo: Photo;
  selectedFiles: FileList | any;
  currentFileUpload: File | any;
  progress: { percentage: number } = { percentage: 0 };
  selectedFile = null;
  changeImage = false;
  file : string;

  constructor(private activatedRoute: ActivatedRoute, private photoService: PhotoService, private https:HttpClient){}

  ngOnInit() {
    this._photo = new Photo();
    this._photo.post = new Post();
    this._photo.post.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  change(event : any) {
    this.changeImage = true;
  }

  changedImage(event : any) {
    this.selectedFile = event.target.files[0];
  }

  upload() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.photoService.uploadPhotoToAWS(this._photo, this.currentFileUpload).subscribe(event => {
      this.selectedFiles = undefined;
    });
  }

  selectFile(event : any) {
    this.selectedFiles = event.target.files;
    this.file = this.selectedFiles[0].name;
  }

}
