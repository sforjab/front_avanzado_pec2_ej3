import { createAction, props } from "@ngrx/store";
import { AuthDTO } from "../models/auth.dto";
import { HttpErrorResponse } from "@angular/common/http";

export const login = createAction(
    '[Login Page] Login',
    props<{ credentials: AuthDTO }>()
);

export const loginSuccess = createAction(
    '[Login Page] Login Success',
    props<{ credentials: AuthDTO }>()
);

export const loginFailure = createAction(
    '[Login Page] Login Failure',
    props<{ payload: HttpErrorResponse }>()
);

export const logout = createAction(
    '[Login Page] Logout'
);