import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CategoryService } from "../services/category.service";
import { Router } from "@angular/router";
import { SharedService } from "src/app/Shared/Services/shared.service";
import { catchError, exhaustMap, finalize, map } from "rxjs/operators";
import * as CategoriesActions from '../actions';
import { of } from "rxjs";

@Injectable()
export class PostsEffects {
    private responseOK: boolean;
    private errorResponse: any;

    constructor(
        private actions$: Actions,
        private categoryService: CategoryService,
        private sharedService: SharedService,
        private router: Router
    ) {
        this.responseOK = false;
    }

    getCategoriesById$ = createEffect(
        () =>
        this.actions$.pipe(
            ofType(CategoriesActions.getCategoryById),
            exhaustMap((action) => 
                this.categoryService.getCategoryById(action.categoryId).pipe(
                    map((category) => {
                        return CategoriesActions.getCategoryByIdSuccess({
                            category: category
                        });
                    }),
                    catchError((error) => {
                        return of(CategoriesActions.getCategoryByIdFailure({ payload: error }))
                    })
                )
            )
        )
    );

    getCategoriesByIdFailure$ = createEffect(
        () =>
        this.actions$.pipe(
            ofType(CategoriesActions.getCategoryByIdFailure),
            map((error) => {
                this.errorResponse = error.payload.error;
                this.sharedService.errorLog(error.payload.error);
            })
        ),
        { dispatch: false }
    );

    getCategoriesByUserId$ = createEffect(
        () => 
        this.actions$.pipe(
            ofType(CategoriesActions.getCategoriesByUserId),
            exhaustMap((action) => 
                this.categoryService.getCategoriesByUserId(action.userId).pipe(
                    map((categories) => {
                        return CategoriesActions.getCategoriesByUserIdSuccess({
                            categories: categories
                        });
                    }),
                    catchError((error) => {
                        return of(CategoriesActions.getCategoriesByUserIdFailure({ payload: error }));
                    })
                )
            )
        )
    );

    getCategoriesByUserIdFailure$ = createEffect(
        () =>
        this.actions$.pipe(
            ofType(CategoriesActions.getCategoriesByUserIdFailure),
            map((error) => {
                this.errorResponse = error.payload.error;
                this.sharedService.errorLog(error.payload.error);
            })
        ),
        { dispatch: false }
    );

    editCategory$ = createEffect(
        () =>
        this.actions$.pipe(
            ofType(CategoriesActions.updateCategory),
            exhaustMap((action) => 
                this.categoryService.updateCategory(action.category.categoryId, action.category).pipe(
                    map((category) => {
                        return CategoriesActions.updateCategorySuccess({
                            category: category
                        });
                    }),
                    catchError((error) => {
                        return of(CategoriesActions.updateCategoryFailure({ payload: error }))
                    }),
                    finalize(async () => {
                        await this.sharedService.managementToast(
                            'categoryFeedback',
                            this.responseOK,
                            this.errorResponse
                        );

                        if (this.responseOK) {
                            this.router.navigateByUrl('categories');
                        }
                    })
                )
            )
        )
    );

    editCategorySuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(CategoriesActions.updateCategorySuccess),
                map(() => {
                    this.responseOK = true;
                })
            ),
        { dispatch: false }
    );

    editCategoryFailure$ = createEffect(
        () => 
            this.actions$.pipe(
                ofType(CategoriesActions.updateCategoryFailure),
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
            ofType(CategoriesActions.deleteCategory),
            exhaustMap((action) => 
                this.categoryService.deleteCategory(action.categoryId).pipe(
                    map(() => {
                        return CategoriesActions.deleteCategorySuccess({ 
                            categoryId: action.categoryId 
                        });
                    }),
                    catchError((error) => {
                        return of(CategoriesActions.deleteCategoryFailure({ payload: error }));
                    })
                )
            )
        )
    );

    deletePostFailure$ = createEffect(
        () =>
        this.actions$.pipe(
            ofType(CategoriesActions.deleteCategoryFailure),
            map((error) => {
                this.errorResponse = error.payload.error;
                this.sharedService.errorLog(error.payload.error);
            })
        ),
        { dispatch: false }
    );
}