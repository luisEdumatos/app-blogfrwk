import { PostCreate } from './../models/post-create';
import { PostService } from './../services/post.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BroadCastService } from 'src/app/broadcast.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-post-create',
  templateUrl: '../templates/post-create.component.html',
  styleUrls: ['../styles/post-create.component.css'],
  providers: [MessageService]
})
export class PostCreateComponent implements OnInit {

  _postCreate: PostCreate;

  formPost: FormGroup;

  spinner = false;

  constructor(private postService: PostService, private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit() {
    this.broadCast();
    this._postCreate = new PostCreate();
    this.formPost = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      mainImage: ['', [Validators.minLength(10), Validators.maxLength(100)]],
      mainLink: ['', [Validators.minLength(10), Validators.maxLength(100)]]
    })
  }

  get validation() {
    return this.formPost.controls;
  }

  createPost(): void {
    BroadCastService.get("spinner").emit(true);
    this.postService.createPost(this._postCreate).subscribe({
      next: post => {
        console.log('Post create with sucess', post);
        BroadCastService.get("spinner").emit(false);
        this.messageService.add({severity:'success', summary: 'Sucesso!', detail: 'Nova publicação adicionada ao Blog Frwk.'});
      },
      error: err => {
        console.log('Error', err);
        BroadCastService.get("spinner").emit(false);
        this.messageService.add({severity:'error', summary: 'Erro', detail: 'Ocorreu um erro ao criar a publicação, verifique novamente os campos.'});
      }
    });
  }

  broadCast(): void {
    BroadCastService.get("spinner").subscribe((spinner: boolean) => {
      this.spinner = spinner;
    });
  }
}
