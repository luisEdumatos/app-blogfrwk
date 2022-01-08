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

  filteredPosts: Post[] = [];

  _posts: Post[] = [];

  _filterBy: string;

  spinner = false;

  constructor(private postService: PostService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.broadCast();
    this.getPosts();
  }

  getPosts(): void {
    BroadCastService.get("spinner").emit(true);
    this.postService.listAll().subscribe({
      next: posts => {
        this._posts = posts;
        this.filteredPosts = this._posts;
        BroadCastService.get("spinner").emit(false);
      },
      error: err => {
        console.log('Error', err);
        BroadCastService.get("spinner").emit(false);
      }
    });
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
