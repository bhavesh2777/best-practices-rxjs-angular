import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Posts } from 'src/app/models/posts.model';
import { PostsService } from '../posts.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  postArr$: Observable<Posts[]>;
  private postSub: Subscription;

  constructor(
    private readonly postsService: PostsService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.changeDetectorRef.detach();
    this.fetchPosts();
    this.postArr$ = this.postsService.postsList$;
    this.changeDetectorRef.reattach();
  }

  refreshPosts() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.postSub = this.postsService.getPosts().subscribe();
  }

  deleteItem(postId: number) {
    if (postId) this.postsService.deletePost(postId).subscribe();
  }

  identify(index, item) {
    return item.id;
  }

  ngOnDestroy(): void {
    this.postSub?.unsubscribe();
  }
}
