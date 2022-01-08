import { CommentService } from './../services/comment.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../models/comment';
import { BroadCastService } from 'src/app/broadcast.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-comment-detail',
  templateUrl: '../templates/comment-detail.component.html',
  styleUrls: ['../styles/comment-detail.component.css'],
  providers: [MessageService]
})
export class CommentDetailComponent implements OnInit {

  _comment: Comment;

  formComment: FormGroup;

  spinner = false;

  constructor(private activatedRoute: ActivatedRoute, private commentService: CommentService, private location: Location, private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit() {
    this.broadCast();
    this.getCommentByID();
    this.formComment = this.fb.group({
      comment: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(80)]]
    })
  }

  get validation() {
    return this.formComment.controls;
  }

  getCommentByID(): void {
    BroadCastService.get("spinner").emit(true);
    this.commentService.findById(Number(this.activatedRoute.snapshot.paramMap.get('comment_id'))).subscribe({
      next: comment => {
        this._comment = comment;
        BroadCastService.get("spinner").emit(false);
      },
      error: err => {
        console.log('Error', err);
        BroadCastService.get("spinner").emit(false);
      }
    });
  }

  update(): void {
    BroadCastService.get("spinner").emit(true);
    this.commentService.update(this._comment).subscribe({
      next: comment => {
        console.log('comment saved with success');
        BroadCastService.get("spinner").emit(false);
        this.messageService.add({severity:'success', summary: 'Sucesso!', detail: 'O conteúdo do comentário foi atualizado.'});
      },
      error: err =>  {
        console.log(`Error`, err);
        this.messageService.add({severity:'error', summary: 'Erro', detail: 'Ocorreu um erro na atualização. Se você não é o dono da comentário, não poderá atualizar. Se for o dono, verifique novamente os campos'});
        BroadCastService.get("spinner").emit(false);
      }
    });
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
