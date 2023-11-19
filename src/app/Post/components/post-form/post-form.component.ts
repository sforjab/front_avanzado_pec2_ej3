import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { CategoryDTO } from 'src/app/Category/models/category.dto';
import { PostDTO } from 'src/app/Post/models/post.dto';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import * as PostsActions from '../../actions';
import { getCategoriesByUserId } from '../../../Category/actions';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {
  userId: string;
  post: PostDTO;
  title: UntypedFormControl;
  description: UntypedFormControl;
  num_likes!: UntypedFormControl;
  num_dislikes!: UntypedFormControl;
  publication_date: UntypedFormControl;
  categories!: UntypedFormControl;

  postForm: UntypedFormGroup;
  isValidForm: boolean | null;

  private isUpdateMode: boolean;
  /* private validRequest: boolean; */
  private postId: string | null;

  categoriesList!: CategoryDTO[];

  constructor(
    private activatedRoute: ActivatedRoute,
    /* private postService: PostService, */
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private store: Store<AppState>
    /* private sharedService: SharedService, */
    /* private localStorageService: LocalStorageService, */
    /* private categoryService: CategoryService */
  ) {
    this.isValidForm = null;
    this.postId = this.activatedRoute.snapshot.paramMap.get('id');
    this.post = new PostDTO('', '', 0, 0, new Date());
    this.isUpdateMode = false;

    this.userId = '';
    this.store.select('auth').subscribe((auth) => {
      if(auth.credentials.user_id) {
        this.userId = auth.credentials.user_id;
      }
    });
    /* this.validRequest = false; */

    this.title = new UntypedFormControl(this.post.title, [
      Validators.required,
      Validators.maxLength(55),
    ]);

    this.description = new UntypedFormControl(this.post.description, [
      Validators.required,
      Validators.maxLength(255),
    ]);

    this.publication_date = new UntypedFormControl(
      formatDate(this.post.publication_date, 'yyyy-MM-dd', 'en'),
      [Validators.required]
    );

    this.num_likes = new UntypedFormControl(this.post.num_likes);
    this.num_dislikes = new UntypedFormControl(this.post.num_dislikes);

    this.categories = new UntypedFormControl([]);

    // get categories by user and load multi select
    this.loadCategories();

    this.postForm = this.formBuilder.group({
      title: this.title,
      description: this.description,
      publication_date: this.publication_date,
      categories: this.categories,
      num_likes: this.num_likes,
      num_dislikes: this.num_dislikes,
    });
  }

  private loadCategories(): void {
    /* let errorResponse: any;
    const userId = this.localStorageService.get('user_id'); */
    if (this.userId) {
    //if (userId) {
      this.store.dispatch(
        getCategoriesByUserId({ userId: this.userId })
      );
      /* this.categoryService.getCategoriesByUserId(userId).subscribe(
        (categoriesResult) => {
          this.categoriesList = categoriesResult;
        },
        (error) => {
          errorResponse = error.error;
          this.sharedService.errorLog(errorResponse);
        }
      ); */
    }
  }

  ngOnInit(): void {
    //let errorResponse: any;
    // update
    if (this.postId) {
      this.isUpdateMode = true;

      this.store.dispatch(
        PostsActions.getPostById({ postId: this.postId })
      );
      /* this.postService.getPostById(this.postId)
      .subscribe(
        (postResult) => {
          this.post = postResult;

          this.title.setValue(this.post.title);

          this.description.setValue(this.post.description);

          this.publication_date.setValue(
            formatDate(this.post.publication_date, 'yyyy-MM-dd', 'en')
          );

          let categoriesIds: string[] = [];
          this.post.categories.forEach((cat: CategoryDTO) => {
            categoriesIds.push(cat.categoryId);
          });

          this.categories.setValue(categoriesIds);

          this.num_likes.setValue(this.post.num_likes);
          this.num_dislikes.setValue(this.post.num_dislikes);

          this.postForm = this.formBuilder.group({
            title: this.title,
            description: this.description,
            publication_date: this.publication_date,
            categories: this.categories,
            num_likes: this.num_likes,
            num_dislikes: this.num_dislikes,
          });
        },
        (error) => {
          errorResponse = error.error;
          this.sharedService.errorLog(errorResponse);
        }
      ); */
    }
  }

  private editPost(): void {
    if(this.postId) {
      if(this.userId) {
        this.store.dispatch(
          PostsActions.updatePost({ post: this.post })
        );
      }
    }
    
    /* let errorResponse: any;
    let responseOK: boolean = false;
    if (this.postId) {
      const userId = this.localStorageService.get('user_id');
      if (userId) {
        this.post.userId = userId;

        this.postService.updatePost(this.postId, this.post)
        .pipe(
          finalize(async () => {
            await this.sharedService.managementToast(
              'postFeedback',
              responseOK,
              errorResponse
            );
      
            if (responseOK) {
              this.router.navigateByUrl('posts');
            }
          })
        )
        .subscribe(
          () => {
            responseOK = true;
          },
          (error) => {
            errorResponse = error.error;
            this.sharedService.errorLog(errorResponse);
          }
        );
      }
    } */
  }

  private createPost(): void {
    /* let errorResponse: any;
    let responseOK: boolean = false;
    const userId = this.localStorageService.get('user_id'); */
    //if (userId) {
    if(this.userId) {
      //this.post.userId = userId;
      this.post.userId = this.userId;

      this.store.dispatch(
        PostsActions.updatePost({ post: this.post })
      );
      /* this.postService.createPost(this.post)
      .pipe(
        finalize(async () => {
          await this.sharedService.managementToast(
            'postFeedback',
            responseOK,
            errorResponse
          );
    
          if (responseOK) {
            this.router.navigateByUrl('posts');
          }
        })
      )
      .subscribe(
        () => {
          responseOK = true;
        },
        (error) => {
          errorResponse = error.error;
          this.sharedService.errorLog(errorResponse);
        }
      ); */
    }
  }

  savePost() {
    this.isValidForm = false;

    if (this.postForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.post = this.postForm.value;

    if (this.isUpdateMode) {
      this.editPost();
    } else {
      this.createPost();
    }
  }
}
