import { Component } from '@angular/core';
import { PhotoService } from './../services/photo.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Location } from '@angular/common';
import { Photo } from '../models/photo';
import { Post } from '../../post/models/post';
import { BroadCastService } from 'src/app/broadcast.service';
import {MessageService} from 'primeng/api';
import { PhotoDetail } from '../models/photo-detail';

@Component({
  selector: 'app-photo',
  templateUrl: '../templates/photo.component.html',
  styleUrls: ['../styles/photo.component.css'],
  providers: [MessageService]
})

export class PhotoComponent {
  _photo: Photo;
  _photos: PhotoDetail[] = [];
  selectedFiles: FileList | any;
  currentFileUpload: File | any;
  progress: { percentage: number } = { percentage: 0 };
  selectedFile = null;
  changeImage = false;
  file : string;
  spinner = false;

  constructor(private activatedRoute: ActivatedRoute, private confirmationService: ConfirmationService, private photoService: PhotoService, private location: Location, private https:HttpClient, private messageService: MessageService){}

  ngOnInit() {
    this.broadCast();
    this._photo = new Photo();
    this._photo.post = new Post();
    this._photo.post.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getPhotosByPostId();
  }

  getPhotosByPostId(): void {
    BroadCastService.get("spinner").emit(true);
    this.photoService.listAllByPostId(Number(this._photo.post.id)).subscribe({
      next: comments => {
        this._photos = comments;
        BroadCastService.get("spinner").emit(false);
      },
      error: err => {
        console.log('Error', err);
        BroadCastService.get("spinner").emit(false);
      }
    });
  }

  deleteById(photo_id: number): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir esta foto??',
      accept: () => {
        BroadCastService.get("spinner").emit(true);
        this.photoService.deleteById(photo_id).subscribe({
          next: () => {
            console.log(`Photo with id ${photo_id} deleted with success. `);
            this.getPhotosByPostId();
          },
          error: err => {
            console.log('Error', err);
            BroadCastService.get("spinner").emit(false);
            this.messageService.add({severity:'error', summary:'Erro', detail:'Erro: Você está tentando excluir uma foto em uma publicação que não foi criada por você. Para exclui-la, solicite ao dono!'});
          }
        });
      }
    });
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
    this.getPhotosByPostId();
    window.location.reload();
  }

  selectFile(event : any) {
    this.selectedFiles = event.target.files;
    this.file = this.selectedFiles[0].name;
  }

  openPhotoURL(photoURL : string) {
    window.open(photoURL);
  }

  goBack(): void {
    this.location.back();
  }

  broadCast(): void {
    BroadCastService.get("spinner").subscribe((spinner: boolean) => {
      this.spinner = spinner;
    });
  }

}
