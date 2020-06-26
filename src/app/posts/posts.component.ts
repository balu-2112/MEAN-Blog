import { Component, OnInit } from '@angular/core';
import {PostsService} from '../services/posts.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  showShortDesciption = true;
  posts;
  // post = {title: String, description: String, url: String}
  constructor(private _posts: PostsService,
    private _router: Router) { }

  ngOnInit(): void {
    this._posts.getallPosts()
    .subscribe(
      res => {
        console.log(res);
        this.posts = res;
      },
      err => console.log(err)
    )
  }

  


  

 alterDescriptionText() {
    this.showShortDesciption = !this.showShortDesciption
 }


}
