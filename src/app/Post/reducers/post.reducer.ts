import { Action, createReducer, on } from "@ngrx/store";
import { PostDTO } from "../models/post.dto";
import * as PostsActions from "../actions";

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
    initialState,
    on(PostsActions.getPosts, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
    })),
    on(PostsActions.getPostsSuccess, (state, action) => ({
        ...state,
        posts: action.posts,
        loading: false,
        loaded: true,
        error: null,
    })),
    on(PostsActions.getPostsFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: true,
        error: { payload }
    })),
    on(PostsActions.like, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(PostsActions.likeFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        error: { payload },
    })),
    on(PostsActions.dislike, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(PostsActions.dislikeFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        error: { payload },
    })),
    on(PostsActions.getPostById, (state, { postId }) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
    })),
    on(PostsActions.getPostByIdSuccess, (state, { post }) => ({
        ...state,
        post,
        loading: false,
        loaded: true,
        error: null,
    })),
    on(PostsActions.getPostByIdFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: true,
        error: { payload },
    })),
    on(PostsActions.createPost, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null
    })),
    on(PostsActions.createPostSuccess, (state, { post }) => ({
        ...state,
        posts: [...state.posts, post],
        loading: false,
        loaded: true,
        error: null
    })),
    on(PostsActions.createPostFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: true,
        error: { payload }
    })),
    on(PostsActions.updatePost, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null
    })),
    on(PostsActions.updatePostSuccess, (state, { post }) => ({
            ...state,
            posts: state.posts.map(p => p.postId === post.postId ? post : p),
            loading: false,
            loaded: true,
            error: null
    })),
    on(PostsActions.updatePostFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: true,
        error: { payload }
    })),
    on(PostsActions.getPostsByUserId, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
      })),
    on(PostsActions.getPostsByUserIdSuccess, (state, { posts }) => ({
        ...state,
        posts,
        loading: false,
        loaded: true,
        error: null,
    })),
    on(PostsActions.getPostsByUserIdFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: true,
        error: { payload },
    })),
    on(PostsActions.deletePost, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(PostsActions.deletePostSuccess, (state, { postId }) => ({
        ...state,
        posts: state.posts.filter((post) => post.postId !== postId),
        loading: false,
        error: null,
    })),
    on(PostsActions.deletePostFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        error: { payload },
    }))
);

export function postsReducer(state: PostsState | undefined, action: Action) {
    return _postsReducer(state, action);
}