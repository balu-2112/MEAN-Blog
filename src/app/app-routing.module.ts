import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { UsersComponent } from './users/users.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MypostsComponent } from './myposts/myposts.component';
import { AuthGuard } from './guards/auth.guard';
import { EditpostComponent } from './myposts/editpost/editpost.component';


const routes: Routes = [
  {path: "", redirectTo:'/home', pathMatch: 'full'},
  {path: "home", component: HomeComponent},
  {path:"posts", component: PostsComponent},
  {path: "users", component: UsersComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "myposts", component: MypostsComponent, canActivate: [AuthGuard]},
  {path: "myposts/create", component: EditpostComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
