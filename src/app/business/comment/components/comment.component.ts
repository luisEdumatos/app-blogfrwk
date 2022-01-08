import { CommentService } from './../services/comment.service';
import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../models/comment';
import { ConfirmationService } from 'primeng/api';
import { BroadCastService } from 'src/app/broadcast.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-comment',
  templateUrl: '../templates/comment.component.html',
  styleUrls: ['../styles/comment.component.css'],
  providers: [MessageService]
})
export class CommentComponent implements OnInit {

  @Input() post_id?: number;

  filteredComments: Comment[] = [];

  _comments: Comment[] = [];

  _filterBy: string;

  spinner = false;

  constructor(private commentService: CommentService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit() {
    this.broadCast();
    this.getCommentsByPostId();
  }

  getCommentsByPostId(): void {
    BroadCastService.get("spinner").emit(true);
    this.commentService.listAllByPostId(Number(this.post_id)).subscribe({
      next: comments => {
        this._comments = comments;
        this.filteredComments = this._comments;
        BroadCastService.get("spinner").emit(false);
      },
      error: err => {
        console.log('Error', err);
        BroadCastService.get("spinner").emit(false);
      }
    });
  }

  deleteById(comment_id: number): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este comentário??',
      accept: () => {
        BroadCastService.get("spinner").emit(true);
        this.commentService.deleteById(comment_id).subscribe({
          next: () => {
            console.log(`Comment with id ${comment_id} deleted with success. `);
            this.getCommentsByPostId();
          },
          error: err => {
            console.log('Error', err);
            BroadCastService.get("spinner").emit(false);
            this.messageService.add({severity:'error', summary:'Erro', detail:'Erro: Você está tentando excluir um comentário que não foi criado por você. Para exclui-lo, solicite ao dono! Se você é o dono da publicação, poderá exclui-la para excluir este comentário.'});
          }
        });
      }
    });
  }

  set filter(value: string) {
    this._filterBy = value;

    this.filteredComments = this._comments.filter((comment: Comment) => comment.comment.toLocaleLowerCase().indexOf(this._filterBy.toLocaleLowerCase()) > -1);
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
