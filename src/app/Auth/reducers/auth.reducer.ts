import { Action, createReducer, on } from "@ngrx/store";
import { AuthDTO } from "../models/auth.dto";
import * as AuthActions from "../actions";

export interface AuthState {
    credentials: AuthDTO;
    loading: boolean;
    loaded: boolean;
    error: any;
}

export const initialState: AuthState = {
    credentials: new AuthDTO('', '', '', ''),
    loading: false,
    loaded: false,
    error: null
};

const _authReducer = createReducer(
    initialState,
    on(AuthActions.login, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null
    })),
    on(AuthActions.loginSuccess, (state, action) => ({
        ...state,
        credentials: action.credentials,
        loading: false,
        loaded: true,
        error: null
    })),
    on(AuthActions.loginFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: { payload }
    })),
    on(AuthActions.logout, () => initialState)
);

export function authReducer(state: AuthState | undefined, action: Action): AuthState {
    return _authReducer(state, action);
}