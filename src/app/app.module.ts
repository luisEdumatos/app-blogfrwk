import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {ToastModule} from 'primeng/toast';

import { PostComponent } from './business/post/components/post.component';
import { PostCreateComponent } from './business/post/components/post-create.component';
import { PostDetailComponent } from './business/post/components/post-detail.component';
import { HeaderComponent } from './layout/header/header.component';
import { HomeComponent } from './layout/home/home.component';
import { AuthenticationComponent } from './layout/authentication/authentication.component';
import { authInterceptorProviders } from './security/_helpers/auth.interceptor';
import { LoginComponent } from './security/login/login.component';
import { RegisterComponent } from './security/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostCreateComponent,
    PostDetailComponent,
    HeaderComponent,
    HomeComponent,
    AuthenticationComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    TableModule,
    ToolbarModule,
    InputTextModule,
    InputMaskModule,
    DropdownModule,
    SelectButtonModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
    ToastModule
  ],
  providers: [authInterceptorProviders, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
