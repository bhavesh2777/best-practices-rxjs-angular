import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Posts } from 'src/app/models/posts.model';
import { switchMap, map } from 'rxjs';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  postForm: Posts = {
    id: 0,
    title: '',
    description: '',
    likes: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private readonly postsService: PostsService
  ) {}

  ngOnInit(): void {
    // Fetch post by Id from store to populate data in post form
    const fetchPost$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const postId = Number(params.get('id'));
        return this.postsService.postsList$.pipe(
          map((arr) => arr.find((item) => item.id === postId))
        );
      })
    );
    fetchPost$.subscribe((data) => {
      if (data) this.postForm = { ...data };
      else this.router.navigate(['/']);
    });
  }

  editPost() {
    if (this.postForm.title && this.postForm.description) {
      const updatePost$ = this.postsService.updatePost(this.postForm);
      updatePost$.subscribe((post) => {
        this.postsService.processPostUpdate();
      });
    }
  }
}
