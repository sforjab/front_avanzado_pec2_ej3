import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PostService } from "../services/post.service";
import { Router } from "@angular/router";
import { SharedService } from "src/app/Shared/Services/shared.service";
import { catchError, exhaustMap, finalize, map } from "rxjs/operators";
import * as PostsActions from '../actions';
import { of } from "rxjs";

@Injectable()
export class PostsEffects {
    private responseOK: boolean;
    private errorResponse: any;

    constructor(
        private actions$: Actions,
        private postService: PostService,
        private sharedService: SharedService,
        private router: Router
    ) {
        this.responseOK = false;
    }

    getPosts$ = createEffect(
        () =>
        this.actions$.pipe(
            ofType(PostsActions.getPosts),
            exhaustMap(() =>
                this.postService.getPosts().pipe(
                    map((posts) => {
                        return PostsActions.getPostsSuccess({
                            posts: posts,
                        });
                    }),
                    catchError((error) => {
                        return of(PostsActions.getPostsFailure({ payload: error }));
                    })
                )
            )
        )
    );

    getPostsFailure$ = createEffect(
        () =>
        this.actions$.pipe(
            ofType(PostsActions.getPostsFailure),
            map((error) => {
                this.errorResponse = error.payload.error;
                this.sharedService.errorLog(error.payload.error);
            })
        ),
        { dispatch: false }
    );

    getPostById$ = createEffect(
        () =>
        this.actions$.pipe(
            ofType(PostsActions.getPostById),
            exhaustMap((action) => 
                this.postService.getPostById(action.postId).pipe(
                    map((post) => {
                        return PostsActions.getPostByIdSuccess({
                            post: post
                        });
                    }),
                    catchError((error) => {
                        return of(PostsActions.getPostByIdFailure({ payload: error }))
                    })
                )
            )
        )
    );

    getPostByIdFailure$ = createEffect(
        () =>
        this.actions$.pipe(
            ofType(PostsActions.getPostByIdFailure),
            map((error) => {
                this.errorResponse = error.payload.error;
                this.sharedService.errorLog(error.payload.error);
            })
        ),
        { dispatch: false }
    );

    getPostsByUserId$ = createEffect(
        () => 
        this.actions$.pipe(
            ofType(PostsActions.getPostsByUserId),
            exhaustMap((action) => 
                this.postService.getPostsByUserId(action.userId).pipe(
                    map((posts) => {
                        return PostsActions.getPostsByUserIdSuccess({
                            posts: posts
                        });
                    }),
                    catchError((error) => {
                        return of(PostsActions.getPostsByUserIdFailure({ payload: error }));
                    })
                )
            )
        )
    );

    getPostsByUserIdFailure$ = createEffect(
        () =>
        this.actions$.pipe(
            ofType(PostsActions.getPostsByUserIdFailure),
            map((error) => {
                this.errorResponse = error.payload.error;
                this.sharedService.errorLog(error.payload.error);
            })
        ),
        { dispatch: false }
    );


    like$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PostsActions.like),
            exhaustMap((action) =>
                this.postService.likePost(action.postId).pipe(
                    map(() => {
                        return PostsActions.likeSuccess();
                    }),
                    catchError((error) => {
                        return of(PostsActions.likeFailure({ payload: error }));
                    })
                )
            )
        )
    );

    likeFailure$ = createEffect(
        () =>
        this.actions$.pipe(
            ofType(PostsActions.likeFailure),
            map((error) => {
                this.errorResponse = error.payload.error;
                this.sharedService.errorLog(error.payload.error);
            })
        ),
        { dispatch: false }
    );

    dislike$ = createEffect(
        () =>
        this.actions$.pipe(
            ofType(PostsActions.dislike),
            exhaustMap((action) =>
                this.postService.dislikePost(action.postId).pipe(
                    map(() => {
                        return PostsActions.dislikeSuccess();
                    }),
                    catchError((error) => {
                        return of(PostsActions.dislikeFailure({ payload: error }));
                    })
                )
            )
        )
    );

    dislikeFailure$ = createEffect(
        () =>
        this.actions$.pipe(
            ofType(PostsActions.dislikeFailure),
            map((error) => {
                this.errorResponse = error.payload.error;
                this.sharedService.errorLog(error.payload.error);
            })
        ),
        { dispatch: false }
    );

    editPost$ = createEffect(
        () =>
        this.actions$.pipe(
            ofType(PostsActions.updatePost),
            exhaustMap((action) => 
                this.postService.updatePost(action.post.postId, action.post).pipe(
                    map((post) => {
                        return PostsActions.updatePostSuccess({
                            post: post
                        });
                    }),
                    catchError((error) => {
                        return of(PostsActions.updatePostFailure({ payload: error }))
                    }),
                    finalize(async () => {
                        await this.sharedService.managementToast(
                            'postFeedback',
                            this.responseOK,
                            this.errorResponse
                        );

                        if (this.responseOK) {
                            this.router.navigateByUrl('posts');
                        }
                    })
                )
            )
        )
    );

    editPostSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(PostsActions.updatePostSuccess),
                map(() => {
                    this.responseOK = true;
                })
            ),
        { dispatch: false }
    );

    editPostFailure$ = createEffect(
        () => 
            this.actions$.pipe(
                ofType(PostsActions.updatePostFailure),
                map((error) => {
                    this.errorResponse = error.payload.error;
                    this.sharedService.errorLog(error.payload.error);
                })
            ),
        { dispatch: false }
    );

    createPost$ = createEffect(
        () =>
        this.actions$.pipe(
            ofType(PostsActions.createPost),
            exhaustMap((action) => 
                this.postService.createPost(action.post).pipe(
                    map((post) => {
                        return PostsActions.createPostSuccess({
                            post: post
                        });
                    }),
                    catchError((error) => {
                        return of(PostsActions.createPostFailure({ payload: error }))
                    }),
                    finalize(async () => {
                        await this.sharedService.managementToast(
                            'postFeedback',
                            this.responseOK,
                            this.errorResponse
                        );

                        if (this.responseOK) {
                            this.router.navigateByUrl('posts');
                        }
                    })
                )
            )
        )
    );

    createPostSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(PostsActions.createPostSuccess),
                map(() => {
                    this.responseOK = true;
                })
            ),
        { dispatch: false }
    );

    createPostFailure$ = createEffect(
        () => 
            this.actions$.pipe(
                ofType(PostsActions.createPostFailure),
                map((error) => {
                    this.errorResponse = error.payload.error;
                    this.sharedService.errorLog(error.payload.error);
                })
            ),
        { dispatch: false }
    );

    deletePost$ = createEffect(
        () =>
        this.actions$.pipe(
            ofType(PostsActions.deletePost),
            exhaustMap((action) => 
                this.postService.deletePost(action.postId).pipe(
                    map(() => {
                        return PostsActions.deletePostSuccess({ 
                            postId: action.postId 
                        });
                    }),
                    catchError((error) => {
                        return of(PostsActions.deletePostFailure({ payload: error }));
                    })
                )
            )
        )
    );

    deletePostFailure$ = createEffect(
        () =>
        this.actions$.pipe(
            ofType(PostsActions.deletePostFailure),
            map((error) => {
                this.errorResponse = error.payload.error;
                this.sharedService.errorLog(error.payload.error);
            })
        ),
        { dispatch: false }
    );
}