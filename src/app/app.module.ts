import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
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

import { HeaderComponent } from './layout/header/header.component';
import { AuthenticationComponent } from './layout/authentication/authentication.component';
import { authInterceptorProviders } from './security/_helpers/auth.interceptor';
import { RegisterComponent } from './security/register/register.component';
import { LoginComponent } from './security/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthenticationComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
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
