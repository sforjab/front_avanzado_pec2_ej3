import { Action, createAction, createReducer } from "@ngrx/store";
import { UserDTO } from "../models/user.dto";


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
    initialState
);

export function userReducer(state: UserState | undefined, action: Action) {
    return _userReducer(state, action);
}