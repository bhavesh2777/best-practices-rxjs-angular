import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { share } from 'rxjs';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Constants } from '../global/constants';
import { Posts } from '../models/posts.model';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private postsListSubject = new BehaviorSubject<any>([]);
  postsList$: Observable<Posts[]> = this.postsListSubject.asObservable();

  constructor(private router: Router, private apiService: ApiService) {}

  //#region API calls
  getPosts() {
    // if (this.postsListSubject.value.length !== 0) return this.postsList$;
    return this.apiService.getApi<Posts[]>(Constants.postsUrlPrefix).pipe(
      tap((posts) => {
        this.fetchPostState(posts);
      }),
      share()
    );
  }

  createPost(createPostBody: Posts) {
    return this.apiService
      .postApi<Posts>(Constants.postsUrlPrefix, createPostBody)
      .pipe(
        tap((post) => {
          this.createPostState(post);
        })
      );
  }

  updatePost(updatePostBody: Posts) {
    const updatePostUrl = `${Constants.postsUrlPrefix}/${updatePostBody.id}`;
    return this.apiService.putApi<Posts>(updatePostUrl, updatePostBody).pipe(
      tap((post) => {
        this.updatePostState(post);
      })
    );
  }

  deletePost(postId: number) {
    const deletePostUrl = `${Constants.postsUrlPrefix}/${postId}`;
    return this.apiService.deleteApi(deletePostUrl).pipe(
      tap(() => {
        this.deletePostState(postId);
      })
    );
  }
  //#endregion

  //#region Handle Create Post
  processPostCreation() {
    this.router.navigate(['/']);
  }
  //#endregion

  //#region Handle Edit Post
  processPostUpdate() {
    this.router.navigate(['/']);
  }
  //#endregion

  //#region Manage States
  private fetchPostState(postList: Posts[]) {
    this.postsListSubject.next(postList);
  }

  private createPostState(post: Posts) {
    const existingPosts = this.postsListSubject.value;
    this.postsListSubject.next([...existingPosts, post]);
  }

  private updatePostState(post: Posts) {
    const existingPosts = [...this.postsListSubject.value];
    const postIdx = existingPosts.findIndex((item) => item.id === post.id);
    if (postIdx !== -1) {
      existingPosts[postIdx] = post;
      this.postsListSubject.next([...existingPosts]);
    }
  }

  private deletePostState(postId: number) {
    const existingPosts = [...this.postsListSubject.value];
    const deletedItemState = existingPosts.filter((item) => item.id != postId);
    this.postsListSubject.next([...deletedItemState]);
  }
  //#endregion
}
