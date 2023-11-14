import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { SharedService } from "src/app/Shared/Services/shared.service";
import { catchError, exhaustMap, finalize, map } from "rxjs/operators";
import { AuthDTO } from "../models/auth.dto";
import { of } from "rxjs";


@Injectable()
export class AuthEffects {
    private responseOK: boolean;
    private errorResponse: any;

    constructor(
        private action$: Actions,
        private authService: AuthService,
        private router: Router,
        private sharedService: SharedService
    ) {
        this.responseOK = false;
    }

    login$ = createEffect(() => 
        this.action$.pipe(
            ofType(AuthActions.login),
            exhaustMap(({ credentials }) => 
                this.authService.login(credentials).pipe(
                    map((userToken) => {
                        const credentialsTemp: AuthDTO = {
                            email: credentials.email,
                            password: credentials.password,
                            user_id: credentials.user_id,
                            access_token: credentials.access_token
                        };

                        return AuthenticatorAssertionResponse.loginSuccess({ credentials: credentialsTemp });
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
                            this.router.navigateByUrl('home');
                        }
                    })
                )
            )
        )
    );
}