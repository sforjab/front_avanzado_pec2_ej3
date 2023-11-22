import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { SharedService } from "src/app/Shared/Services/shared.service";
import { HeaderMenusService } from "src/app/Shared/Services/header-menus.service";
import { catchError, exhaustMap, finalize, map } from "rxjs/operators";
import { AuthDTO } from "../models/auth.dto";
import { of } from "rxjs";
import * as AuthActions from '../actions';
import { HeaderMenus } from "src/app/Shared/Models/header-menus.dto";


@Injectable()
export class AuthEffects {
    private responseOK: boolean;
    private errorResponse: any;

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router,
        private sharedService: SharedService,
        private headerMenusService: HeaderMenusService
    ) {
        this.responseOK = false;
    }

    login$ = createEffect(() => 
        this.actions$.pipe(
            ofType(AuthActions.login),
            exhaustMap(({ credentials }) => 
                this.authService.login(credentials).pipe(
                    map((userToken) => {
                        const credentialsTemp: AuthDTO = {
                            email: credentials.email,
                            password: credentials.password,
                            user_id: userToken.user_id,
                            access_token: userToken.access_token
                        };

                        return AuthActions.loginSuccess({ credentials: credentialsTemp });
                    }),
                    catchError((error) => {
                        return of(AuthActions.loginFailure({ payload: error }));
                    }),
                    finalize(async () => {
                        await this.sharedService.managementToast(
                            'loginFeedback',
                            this.responseOK,
                            this.errorResponse
                        );

                        if (this.responseOK) {
                            const headerInfo: HeaderMenus = {
                                showAuthSection: true,
                                showNoAuthSection: false,
                              };
                              // update options menu
                            this.headerMenusService.headerManagement.next(headerInfo);
                            this.router.navigateByUrl('home');
                        }
                    })
                )
            )
        )
    );

    loginSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.loginSuccess),
                map(() => {
                    this.responseOK = true;
                })
            ),
        { dispatch: false }
    );

    loginFailure$ = createEffect(
        () => 
            this.actions$.pipe(
                ofType(AuthActions.loginFailure),
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