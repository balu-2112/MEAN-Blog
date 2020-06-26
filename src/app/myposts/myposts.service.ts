import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class MypostsService {
  private _postsUrl = "http://localhost:3000/blog/posts";
  private _userUrl = "http://localhost:3000/users/user";
  username;
  user;
  allposts;

  constructor(private http: HttpClient,
    private _router: Router,
    private _authService: AuthService) { 
      this.username = this._authService.getUsername();
    }


     getcurrUser(){
      return  this.http.post<any>(this._userUrl,{Username:this._authService.getUsername().toString()});
    }


}
