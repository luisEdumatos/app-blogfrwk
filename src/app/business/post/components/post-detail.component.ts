import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../models/post';
import { BroadCastService } from 'src/app/broadcast.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-post-detail',
  templateUrl: '../templates/post-detail.component.html',
  styleUrls: ['../styles/post-detail.component.css'],
  providers: [MessageService]
})
export class PostDetailComponent implements OnInit {

  _post: Post;

  formPost: FormGroup;

  spinner = false;

  constructor(private activatedRoute: ActivatedRoute, private postService: PostService, private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit() {
    this.broadCast();
    this.getPostByID();
    this.formPost = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      mainImage: ['', [Validators.minLength(10), Validators.maxLength(100)]],
      mainLink: ['', [Validators.minLength(10), Validators.maxLength(100)]]
    })
  }

  get validation() {
    return this.formPost.controls;
  }

  getPostByID(): void {
    BroadCastService.get("spinner").emit(true);
    this.postService.findById(Number(this.activatedRoute.snapshot.paramMap.get('id'))).subscribe({
      next: post => {
        this._post = post;
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
    this.postService.update(this._post).subscribe({
      next: post => {
        console.log('Post saved with success');
        BroadCastService.get("spinner").emit(false);
        this.messageService.add({severity:'success', summary: 'Sucesso!', detail: 'As informações da publicação foram atualizadas.'});
      },
      error: err =>  {
        console.log(`Error`, err);
        this.messageService.add({severity:'error', summary: 'Erro', detail: 'Ocorreu um erro na atualização. Se você não é o dono da publicação, não poderá atualizar. Se for o dono, verifique novamente os campos'});
        BroadCastService.get("spinner").emit(false);
      }
    });
  }

  broadCast(): void {
    BroadCastService.get("spinner").subscribe((spinner: boolean) => {
      this.spinner = spinner;
    });
  }
}
