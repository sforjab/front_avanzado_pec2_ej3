import { Action, createReducer, on } from "@ngrx/store";
import { UserDTO } from "../models/user.dto";
import * as UserActions from "../actions";
 

export interface UserState {
    user: UserDTO;
    loading: boolean;
    loaded: boolean;
    error: any;
}

export const initialState: UserState = {
    user: new UserDTO('', '', '', '', new Date(), '', ''),
    loading: false,
    loaded: false,
    error: null
};

const _userReducer = createReducer(
    initialState,
    on(UserActions.getUserById, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
    })),
    on(UserActions.getUserByIdSuccess, (state, { userData }) => ({
        ...state,
        user: userData,
        loading: false,
        loaded: true,
    })),
    on(UserActions.getUserByIdFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: { payload },
    })),
    on(UserActions.updateUser, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
    })),
    on(UserActions.updateUserSuccess, (state, { userData }) => ({
        ...state,
        user: userData,
        loading: false,
        loaded: true,
    })),
    on(UserActions.updateUserFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: { payload },
    })),
    on(UserActions.registerSuccess, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
    })),
    on(UserActions.registerSuccess, (state, { userData }) => {
        return {
            ...state,
            user: userData,
            loading: false,
            loaded: true,
            error: null
        };
    }),
    on(UserActions.registerFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: { payload },
    }))
);

export function userReducer(state: UserState | undefined, action: Action) {
    return _userReducer(state, action);
}