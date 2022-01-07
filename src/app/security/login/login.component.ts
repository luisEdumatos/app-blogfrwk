import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { BroadCastService } from 'src/app/broadcast.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  formLogin: FormGroup;
  spinner = false;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router,  private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit(): void {
    this.broadCast();
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    this.formLogin = this.fb.group({
      username: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  get validation() {
    return this.formLogin.controls;
  }

  onSubmit(): void {
    const { username, password } = this.form;

    BroadCastService.get("spinner").emit(true);
    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        BroadCastService.get("spinner").emit(false);
        this.router.navigate(['/clients']);
      },
      err => {
        this.errorMessage = err.error.message;
        BroadCastService.get("spinner").emit(false);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Falha no login...certifique o usuário e senha digitados'});
        this.isLoginFailed = true;
      }
    );
  }

  broadCast(): void {
    BroadCastService.get("spinner").subscribe((spinner: boolean) => {
      this.spinner = spinner;
    });
  }

}
