import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { ConfirmationService } from 'primeng/api';
import { BroadCastService } from 'src/app/broadcast.service';

@Component({
  selector: 'app-client',
  templateUrl: '../templates/post.component.html',
  styleUrls: ['../styles/post.component.css']
})
export class PostComponent implements OnInit {

  filteredClients: Post[] = [];

  _clients: Post[] = [];

  _filterBy: string;

  spinner = false;

  constructor(private postService: PostService, private confirmationService: ConfirmationService) { }

  ngOnInit() {

  }

  getPosts(): void {

  }

  set filter(value: string) {

  }

  get filter() {
    return this._filterBy;
  }

  broadCast(): void {
    BroadCastService.get("spinner").subscribe((spinner: boolean) => {
      this.spinner = spinner;
    });
  }
}
