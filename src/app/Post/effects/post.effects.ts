import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PostService } from "../services/post.service";
import { Router } from "@angular/router";
import { SharedService } from "src/app/Shared/Services/shared.service";
import { catchError, exhaustMap, map } from "rxjs/operators";
import * as PostsActions from '../actions';
import { of } from "rxjs";

@Injectable()
export class AuthEffects {
    //private responseOK: boolean;
    private errorResponse: any;

    constructor(
        private actions$: Actions,
        private postService: PostService,
        private sharedService: SharedService
    ) {
        //this.responseOK = false;
    }

    getPosts$ = createEffect(() =>
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

    like$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PostsActions.like),
            exhaustMap(() =>//SEGUIR CON ESTO
                this.postService.likePost(s).pipe(
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
}