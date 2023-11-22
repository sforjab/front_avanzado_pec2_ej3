import { Action, createAction, createReducer, on } from "@ngrx/store";
import { UserDTO } from "../models/user.dto";
/* import * as UserActions from '../actions';
 */

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
 /*    on(UserActions.getUserById, actions.updateUser, actions.register, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
    })),
    on(actions.getUserByIdSuccess, (state, { userData }) => ({
        ...state,
        user: userData,
        loading: false,
        loaded: true,
    })),
    on(actions.updateUserSuccess, actions.registerSuccess, (state) => ({
        ...state,
        loading: false,
        loaded: true,
    })),
    on(actions.getUserByIdFailure, actions.updateUserFailure, actions.registerFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload,
    })) */
);

export function userReducer(state: UserState | undefined, action: Action) {
    return _userReducer(state, action);
}