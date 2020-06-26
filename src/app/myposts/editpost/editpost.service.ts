import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class EditPostService {
  private _postUrl = "http://localhost:3000/blog/newpost";
  private updateUrl = "http://localhost:3000/users/user/";

  constructor(private http: HttpClient,
              private _router: Router) { }

  createPost(post){
      return this.http.post<any>(this._postUrl,post)
  }

  updateUser(data){
      return this.http.post<any>(this.updateUrl+data.id,data);
  }

}
