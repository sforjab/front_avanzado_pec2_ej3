import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../services/user.service";
import { SharedService } from "src/app/Shared/Services/shared.service";
import { catchError, exhaustMap, finalize, map, tap } from "rxjs/operators";
import * as UserActions from '../actions';
import { of } from "rxjs";
import { HeaderMenus } from "src/app/Shared/Models/header-menus.dto";
import { HeaderMenusService } from "src/app/Shared/Services/header-menus.service";
import { Router } from "@angular/router";

@Injectable()
export class UserEffects {
    private responseOK: boolean;
    private errorResponse: any;

    constructor(
        private actions$: Actions,
        private userService: UserService,
        private sharedService: SharedService,
        private headerMenusService: HeaderMenusService,
        private router: Router
    ) {
        this.responseOK = false;
    }

    getUserById$ = createEffect(
        () =>
        this.actions$.pipe(
            ofType(UserActions.getUserById),
            exhaustMap((action) =>
                this.userService.getUSerById(action.userId).pipe(
                    map((user) => {
                        return UserActions.getUserByIdSuccess({
                            userData: user,
                        });
                    }),
                    catchError((error) => {
                        return of(UserActions.getUserByIdFailure({ payload: error }));
                    })
                )
            )
        )
    );

    getUserByIdFailure$ = createEffect(
        () =>
        this.actions$.pipe(
            ofType(UserActions.getUserByIdFailure),
            map((error) => {
                this.errorResponse = error.payload.error;
                this.sharedService.errorLog(error.payload.error);
            })
        ),
        { dispatch: false }
    );

    updateUser$ = createEffect(
        () =>
        this.actions$.pipe(
            ofType(UserActions.updateUser),
            exhaustMap((action) => 
                this.userService.updateUser(action.userId, action.user).pipe(
                    map((user) => {
                        return UserActions.updateUserSuccess({
                            userData: user
                        });
                    }),
                    catchError((error) => {
                        return of(UserActions.updateUserFailure({ payload: error }))
                    }),
                    finalize(async () => {
                        await this.sharedService.managementToast(
                            'profileFeedback',
                            this.responseOK,
                            this.errorResponse
                        );
                    })
                )
            )
        )
    );

    updateUserSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(UserActions.updateUserSuccess),
                map(() => {
                    this.responseOK = true;
                })
            ),
        { dispatch: false }
    );

    updateUserFailure$ = createEffect(
        () => 
            this.actions$.pipe(
                ofType(UserActions.updateUserFailure),
                map((error) => {
                    this.responseOK = false;
                    this.errorResponse = error.payload.error;
                    this.sharedService.errorLog(error.payload.error);
                })
            ),
        { dispatch: false }
    );

    register$ = createEffect(
        () =>
        this.actions$.pipe(
            ofType(UserActions.register),
            exhaustMap((action) => 
                this.userService.register(action.user).pipe(
                    map((user) => {
                        return UserActions.registerSuccess({
                            userData: user
                        });
                    }),
                    catchError((error) => {
                        return of(UserActions.registerFailure({ payload: error }))
                    }),
                    finalize(async () => {
                        await this.sharedService.managementToast(
                            'registerFeedback',
                            this.responseOK,
                            this.errorResponse
                        );

                        if (this.responseOK) {
                            this.router.navigateByUrl('home');
                        }
                    })
                )
            )
        )
    );

    registerSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(UserActions.registerSuccess),
                map(() => {
                    this.responseOK = true;
                })
            ),
        { dispatch: false }
    );

    registerFailure$ = createEffect(
        () => 
            this.actions$.pipe(
                ofType(UserActions.registerFailure),
                map((error) => {
                    this.responseOK = false;
                    this.errorResponse = error.payload.error;

                    const headerInfo: HeaderMenus = {
                        showAuthSection: false,
                        showNoAuthSection: true,
                      };
                      this.headerMenusService.headerManagement.next(headerInfo);

                    this.sharedService.errorLog(error.payload.error);
                })
            ),
        { dispatch: false }
    );
}