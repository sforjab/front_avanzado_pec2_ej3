import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostDTO } from 'src/app/Post/models/post.dto';
import { AppState } from 'src/app/app.reducer';
import * as PostsActions from '../../actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  posts!: PostDTO[];

  numLikes!: number;
  numDislikes!: number;

  constructor(
    private store: Store<AppState>
  ) {
    this.store.select('posts').subscribe((posts) => {
      this.posts = posts.posts;
      this.numLikes = 0;
      this.numDislikes = 0;

      this.posts.forEach((post) => {
        this.numLikes = this.numLikes + post.num_likes;
        this.numDislikes = this.numDislikes + post.num_dislikes;
      });
    });
  }

  ngOnInit(): void {
    this.store.dispatch(PostsActions.getPosts());
    /* this.loadPosts(); */
  }

 /*  private loadPosts(): void { */
    /* let errorResponse: any; */

    /* this.postService.getPosts().subscribe(
      (postsResult) => {
        this.posts = postsResult;

        // Añadimos aquí la lógica existente en el ngOnInit, para que numLikes y numDislikes se actualicen correctamente
        this.posts.forEach((post) => {
          this.numLikes = this.numLikes + post.num_likes;
          this.numDislikes = this.numDislikes + post.num_dislikes;
        });
      },
      (error) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    ); */
  /* } */
}
