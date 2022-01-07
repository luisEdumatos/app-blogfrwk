import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { BroadCastService } from 'src/app/broadcast.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  formRegister: FormGroup;
  spinner = false;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
    this.broadCast();
    this.formRegister = this.fb.group({
      username: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      email: ['',[Validators.required, Validators.minLength(15), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  get validation() {
    return this.formRegister.controls;
  }

  onSubmit(): void {
    const { username, email, password } = this.form;

    BroadCastService.get("spinner").emit(true);
    this.authService.register(username, email, password).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        BroadCastService.get("spinner").emit(false);
        this.messageService.add({severity:'success', summary: 'Sucesso!', detail: 'Sua nova conta foi criada, faça login no sistema!'});
      },
      err => {
        this.errorMessage = err.error.message;
        BroadCastService.get("spinner").emit(false);
        this.messageService.add({severity:'error', summary: 'Erro...', detail: 'Falha ao criar a conta, certifique as regras de criação'});
        this.isSignUpFailed = true;
      }
    );
  }

  broadCast(): void {
    BroadCastService.get("spinner").subscribe((spinner: boolean) => {
      this.spinner = spinner;
    });
  }
}
