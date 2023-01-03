import { Component, OnInit } from '@angular/core';
import { Posts } from 'src/app/models/posts.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  postForm: Posts = {
    id: 0,
    title: '',
    description: '',
    likes: 0,
  };

  constructor(private readonly postsService: PostsService) {}

  ngOnInit(): void {}

  addNewPost() {
    if (this.postForm.title && this.postForm.description) {
      const newPost$ = this.postsService.createPost(this.postForm);
      newPost$.subscribe((post) => {
        this.postsService.processPostCreation();
      });
    }
  }
}
