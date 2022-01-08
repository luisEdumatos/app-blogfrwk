import { CommentCreate } from './../models/comment-create';
import { CommentService } from './../services/comment.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BroadCastService } from 'src/app/broadcast.service';
import {MessageService} from 'primeng/api';
import { Post } from '../../post/models/post';

@Component({
  selector: 'app-comment-create',
  templateUrl: '../templates/comment-create.component.html',
  styleUrls: ['../styles/comment-create.component.css'],
  providers: [MessageService]
})
export class CommentCreateComponent implements OnInit {

  _commentCreate: CommentCreate;

  formComment: FormGroup;

  spinner = false;

  constructor(private activatedRoute: ActivatedRoute, private commentService: CommentService, private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit() {
    this.broadCast();
    this._commentCreate = new CommentCreate();
    this._commentCreate.post = new Post();
    this._commentCreate.post.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.formComment = this.fb.group({
      comment: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(80)]]
    })
  }

  get validation() {
    return this.formComment.controls;
  }

  createComment(): void {
    BroadCastService.get("spinner").emit(true);
    this.commentService.createComment(this._commentCreate).subscribe({
      next: comment => {
        console.log('Comment create with sucess', comment);
        BroadCastService.get("spinner").emit(false);
        this.messageService.add({severity:'success', summary: 'Sucesso!', detail: 'Nova comentário adicionado a publicação.'});
      },
      error: err => {
        console.log('Error', err);
        BroadCastService.get("spinner").emit(false);
        this.messageService.add({severity:'error', summary: 'Erro', detail: 'Ocorreu um erro ao criar o comentário, verifique novamente os campos.'});
      }
    });
  }

  broadCast(): void {
    BroadCastService.get("spinner").subscribe((spinner: boolean) => {
      this.spinner = spinner;
    });
  }
}
