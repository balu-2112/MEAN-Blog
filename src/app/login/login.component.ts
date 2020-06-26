import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Username:String;
  Password: String;
  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit(): void {
  }

  loginUser(){
    alert("Dont Refresh the page!! Wait for a minute");
    this._auth.loginUser({Username:this.Username,Password:this.Password})
    .subscribe(
      res => {
       
        localStorage.setItem('username',this.Username.toString())
        localStorage.setItem('token', res.token);
        this._router.navigate(['/posts'])
      },
      err => console.log(err)
    )
  }

}
