import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostDTO } from 'src/app/Post/models/post.dto';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as PostsActions from '../../actions';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent {
  posts: PostDTO[];
  private userId: string;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {
    this.userId = '';
    this.posts = new Array<PostDTO>();
    
    this.store.select('auth').subscribe((auth) => {
      if(auth.credentials.user_id) {
        this.userId = auth.credentials.user_id;
      }
    });

    this.store.select('posts').subscribe((posts) => {
      this.posts = posts.posts;
    });
    
    this.loadPosts();
  }

  private loadPosts(): void {
    if (this.userId) {
      this.store.dispatch(
        PostsActions.getPostsByUserId({ userId: this.userId })
      );
    }
  }

  createPost(): void {
    this.router.navigateByUrl('/user/post/');
  }

  updatePost(postId: string): void {
    this.router.navigateByUrl('/user/post/' + postId);
  }

  deletePost(postId: string): void {
    // show confirmation popup
    let result = confirm('Confirm delete post with id: ' + postId + ' .');
    if (result) {
      this.store.dispatch(
        PostsActions.deletePost({ postId: postId })
      );
    }
  }
}
