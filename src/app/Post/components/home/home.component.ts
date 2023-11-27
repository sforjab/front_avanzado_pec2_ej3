import { Component } from '@angular/core';
import { PostDTO } from 'src/app/Post/models/post.dto';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import * as PostsActions from '../../actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  posts!: PostDTO[];
  showButtons: boolean;
  userId: string;

  constructor(
    private store: Store<AppState>
  ) {
    this.userId = '';
    this.store.select('auth').subscribe((auth) => {
      if(auth.credentials.user_id) {
        this.userId = auth.credentials.user_id;
      }
    });
    this.store.select('posts').subscribe((posts) => {
      this.posts = posts.posts;
    });
    this.showButtons = false;
  }

  ngOnInit(): void {
    if(this.userId) {
      this.showButtons = true;
    }

    this.store.dispatch(
      PostsActions.getPosts()
    );
  }


  like(postId: string): void {
    this.store.dispatch(
      PostsActions.like({ postId: postId })
    );
  }

  dislike(postId: string): void {    
    this.store.dispatch(
      PostsActions.dislike({ postId: postId })
    );
  }
}
