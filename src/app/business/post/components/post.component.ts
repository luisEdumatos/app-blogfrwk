import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { ConfirmationService } from 'primeng/api';
import { BroadCastService } from 'src/app/broadcast.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-post',
  templateUrl: '../templates/post.component.html',
  styleUrls: ['../styles/post.component.css'],
  providers: [MessageService]
})
export class PostComponent implements OnInit {

  filteredPosts: Post[] = [];

  _posts: Post[] = [];

  _filterBy: string;

  spinner = false;

  constructor(private postService: PostService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

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

  deleteById(post_id: number): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir esta publicação??',
      accept: () => {
        BroadCastService.get("spinner").emit(true);
        this.postService.deleteById(post_id).subscribe({
          next: () => {
            console.log(`Post with id ${post_id} deleted with success. `);
            this.getPosts();
          },
          error: err => {
            console.log('Error', err);
            BroadCastService.get("spinner").emit(false);
            this.messageService.add({severity:'error', summary:'Erro', detail:'Erro: Você está tentando excluir uma publicação que não foi criada por você. Para exclui-la, solicite ao dono!'});
          }
        });
      }
    });
  }

  set filter(value: string) {
    this._filterBy = value;

    this.filteredPosts = this._posts.filter((post: Post) => post.description.toLocaleLowerCase().indexOf(this._filterBy.toLocaleLowerCase()) > -1);
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
