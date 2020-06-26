import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _registerUrl = "http://localhost:3000/users/signup";
  private _loginUrl = "http://localhost:3000/users/login";
  username;

  constructor(private http: HttpClient,
              private _router: Router) { }

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user)
  }

  loginUser(user) {
    this.username = user.Username;
    console.log(this.username);
    return this.http.post<any>(this._loginUrl, user)
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  logoutUser(){
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }

  getToken(){
    return localStorage.getItem('token');
  }


  getUsername(){
    return localStorage.getItem('username');
  }

}
