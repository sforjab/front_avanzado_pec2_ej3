import { Action, createAction, createReducer } from "@ngrx/store";
import { PostDTO } from "../models/post.dto";

export interface PostsState {
    posts: PostDTO[];
    post: PostDTO;
    loading: boolean;
    loaded: boolean;
    error: any;
}

export const initialState: PostsState = {
    posts: [],
    post: new PostDTO('', '', 0, 0, new Date()),
    loading: false,
    loaded: false,
    error: null
};

const _postsReducer = createReducer(
    initialState
);

export function postsReducer(state: PostsState | undefined, action: Action) {
    return _postsReducer(state, action);
}