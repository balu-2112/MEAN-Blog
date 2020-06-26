import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private _postsUrl = "http://localhost:3000/blog/posts";

  constructor(private http: HttpClient,
    private _router: Router) { }


    getallPosts(){
      return this.http.get(this._postsUrl)
    }
}
