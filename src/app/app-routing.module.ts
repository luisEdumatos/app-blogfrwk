import { AuthGuard } from './security/_services/auth.guard';
import { PostComponent } from './business/post/components/post.component';
import { PostCreateComponent } from './business/post/components/post-create.component';
import { PostDetailComponent } from './business/post/components/post-detail.component';
import { CommentCreateComponent } from './business/comment/components/comment-create.component';
import { CommentDetailComponent } from './business/comment/components/comment-detail.component';
import { PhotoComponent } from './business/photo/components/photo.component';
import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './security/login/login.component';
import { RegisterComponent } from './security/register/register.component';
import { HomeComponent } from './layout/home/home.component';
import { AuthenticationComponent } from './layout/authentication/authentication.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      { path: '', component: PostComponent },
      { path: 'posts', component: PostComponent },
      { path: 'posts/create-post', component: PostCreateComponent },
      { path: 'posts/info/:id', component: PostDetailComponent },
      { path: 'posts/info/:id/comment/:comment_id', component: CommentDetailComponent },
      { path: 'posts/info/:id/comment-create', component: CommentCreateComponent },
      { path: 'posts/info/:id/photo-gallery', component: PhotoComponent }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '', component: AuthenticationComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  }
]


@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
