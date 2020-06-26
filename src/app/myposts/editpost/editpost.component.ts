import { Component, OnInit, Input } from '@angular/core';
import { EditPostService } from './editpost.service';
import { MypostsService } from '../myposts.service';
import { PostsService } from '../../services/posts.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css']
})
export class EditpostComponent implements OnInit {


  title;
  description;
  image_url;
  post_id;

  posts;
  user;
  myposts

  @Input() public parentTitle;

  constructor(private _createpost: EditPostService,
              private _currUser: MypostsService,
              private _allposts: PostsService,
              private _router: Router) { }

  ngOnInit(): void {
  }

  createNewPost(){
    this._createpost.createPost({blog_title:this.title,description:this.description,image_url:this.image_url})
    .subscribe(
      res => {console.log(res),
        this.post_id = res._id;

        this._currUser.getcurrUser()
        .subscribe(
          res => {
            console.log(res)
            this.user = res['posts'];


            this._allposts.getallPosts()
            .subscribe(
              res => {
                this.posts = res;
                this.filteruserposts();

                this.myposts.push(this.post_id);

                this._createpost.updateUser({posts:this.myposts,id:res['_id']})
                .subscribe(
                  res => {
                    console.log(res)
                    this._router.navigate(['/posts'])
                  },
                  err => console.log(err)
                )
    
              },
              err => console.log(err)
            )
    
              },
              err => console.log(err)
            )


      },
      err => {
        console.log(err)
      }
    )

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
