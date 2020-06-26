import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserData = {}
  Username: String;
  Password: String;
  DOB: Date;
  Posts=[];
  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit() {
  }

  registerUser(){
    alert("Dont Refresh the page!! Wait for a minute");
    this._auth.registerUser({Username:this.Username,Password:this.Password,DOB:this.DOB,Posts:this.Posts})
    .subscribe(
      res => {
        console.log(res);
        localStorage.setItem('username', (res.Username));
        localStorage.setItem('token', res.token);
        this._router.navigate(['/posts'])
      },
      err => console.log(err)
    )
  }

}
