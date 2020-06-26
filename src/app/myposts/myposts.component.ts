import { Component, OnInit  } from '@angular/core';
import { MypostsService } from './myposts.service';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.component.html',
  styleUrls: ['./myposts.component.css'],
  template: `
  <app-editpost [parentTitle] = "currtitle"></app-editpost>
  `
})
export class MypostsComponent implements OnInit {

  showShortDesciption = true;
  public currtitle="";
  public currdescription = "";
  public currimageurl = "";
  posts;
  user;
  myposts=[];
  constructor(private _myposts: MypostsService,
              private _allposts: PostsService) { 
              }

  ngOnInit(): void {

    this._myposts.getcurrUser()
    .subscribe(
      res => {
        // console.log("InInit",res)
        this.user = res['posts'];
      },
      err => console.log(err)
    )

    this._allposts.getallPosts()
    .subscribe(
      res => {
        this.posts = res;
        this.filteruserposts();
      },
      err => console.log(err)
    )
    
  }

  editPost(title,description,imageurl){
    this.currtitle = title.innerHTML;
    this.currdescription = description.innerHTML;
    this.currimageurl = imageurl.src;
    document.getElementById('postdisplay').style.display = 'none';
    document.getElementById('editform').style.display  = 'block';
  }

  goback(){
    document.getElementById('postdisplay').style.display = 'block';
    document.getElementById('editform').style.display  = 'none';
  }



 alterDescriptionText() {
    this.showShortDesciption = !this.showShortDesciption
 }



 filteruserposts(){
  let userposts = this.user;
  console.log("User",this.user);

    var filteredArray  = this.posts.filter(function(array_el){
        return userposts.filter(function(anotherOne_el){
            return anotherOne_el == array_el._id;
        }).length == 0
    });

    var result  = this.posts.filter(function(array_el){
      return filteredArray.filter(function(anotherOne_el){
          return anotherOne_el.id == array_el.id;
      }).length == 0
  });

    console.log(result);
    this.myposts = result;
 }
}
