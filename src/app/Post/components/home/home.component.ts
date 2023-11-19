import { Component } from '@angular/core';
import { HeaderMenus } from 'src/app/Shared/Models/header-menus.dto';
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
    /* private postService: PostService,
    private localStorageService: LocalStorageService,
    private sharedService: SharedService,
    private router: Router,
    private headerMenusService: HeaderMenusService */
    private store: Store<AppState>
  ) {
    this.userId = '';
    this.store.select('auth').subscribe((auth) => {
      if(auth.credentials.user_id) {
        this.userId = auth.credentials.user_id;
      }
    });
    this.showButtons = false;
    this.loadPosts();
  }

  ngOnInit(): void {
    // ESTO HAY QUE VER QUÉ HACER PORQUE NO SÉ DÓNDE VA
    /* this.headerMenusService.headerManagement.subscribe(
      (headerInfo: HeaderMenus) => {
        if (headerInfo) {
          this.showButtons = headerInfo.showAuthSection;
        }
      }
    ); */
  }

  private loadPosts(): void {
    /* let errorResponse: any;
    const userId = this.localStorageService.get('user_id'); */
   /*  if (userId) { */
   if(this.userId) {
      this.showButtons = true;
    }

    this.store.dispatch(
      PostsActions.getPosts()
    );

    /* this.postService.getPosts().subscribe(
      (postsResult) => {
        this.posts = postsResult;
      },
      (error) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    ); */
  }

  like(postId: string): void {
    /* let errorResponse: any; */

    this.store.dispatch(
      PostsActions.like({ postId: postId })
    );
    /* this.postService.likePost(postId).subscribe(
      () => {
        this.loadPosts();
      },
      (error) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    ); */
  }

  dislike(postId: string): void {
    /* let errorResponse: any; */
    
    this.store.dispatch(
      PostsActions.dislike({ postId: postId })
    );
    /* this.postService.dislikePost(postId).subscribe(
      () => {
        this.loadPosts();
      },
      (error) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    ); */
  }
}
