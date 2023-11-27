import { createAction, props } from "@ngrx/store";
import { PostDTO } from "../models/post.dto";
import { HttpErrorResponse } from "@angular/common/http";

// Obtener todos los posts
export const getPosts = createAction('[Home or Dashboard Page] Get Posts');

export const getPostsSuccess = createAction(
    '[Home or Dashboard Page] Get Posts Success',
    props<{ posts: PostDTO[] }>()
);

export const getPostsFailure = createAction(
    '[Home or Dashboard Page] Get Posts Failure',
    props<{ payload: HttpErrorResponse }>()
);

// Dar 'like' a un post
export const like = createAction(
    '[Home Page] Like',
    props<{ postId: string }>()
);

export const likeFailure = createAction(
    '[Home Page] Like Failure',
    props<{ payload: HttpErrorResponse }>()
);

// Dar 'dislike' a un post
export const dislike = createAction(
    '[Home Page] Dislike',
    props<{ postId: string }>()
);

export const dislikeFailure = createAction(
    '[Home Page] Dislike Failure',
    props<{ payload: HttpErrorResponse }>()
);

// Obtener un post por su ID
export const getPostById = createAction(
    '[Post Form Page] Get Post By ID',
    props<{ postId: string }>()
);

export const getPostByIdSuccess = createAction(
    '[Post Form Page] Get Post By ID Success',
    props<{ post: PostDTO }>()
);

export const getPostByIdFailure = createAction(
    '[Post Form Page] Get Post By ID Failure',
    props<{ payload: HttpErrorResponse }>()
);

// Actualizar un post
export const updatePost = createAction(
    '[Post Form Page] Update Post',
    props<{ postId: string, post: PostDTO }>()
);

export const updatePostSuccess = createAction(
    '[Post Form Page] Update Post Success',
    props<{ post: PostDTO }>()
);

export const updatePostFailure = createAction(
    '[Post Form Page] Update Post Failure',
    props<{ payload: HttpErrorResponse }>()
);

// Crear un nuevo post
export const createPost = createAction(
    '[Post Form Page] Create Post',
    props<{ post: PostDTO }>()
);

export const createPostSuccess = createAction(
    '[Post Form Page] Create Post Success',
    props<{ post: PostDTO }>()
);

export const createPostFailure = createAction(
    '[Post Form Page] Create Post Failure',
    props<{ payload: HttpErrorResponse }>()
);

// Obtener posts por ID de usuario
export const getPostsByUserId = createAction(
    '[Posts List Page] Get Posts By User ID',
    props<{ userId: string }>()
);

export const getPostsByUserIdSuccess = createAction(
    '[Posts List Page] Get Posts By User ID Success',
    props<{ posts: PostDTO[] }>()
);

export const getPostsByUserIdFailure = createAction(
    '[Posts List Page] Get Posts By User ID Failure',
    props<{ payload: HttpErrorResponse }>()
);

// Eliminar un post
export const deletePost = createAction(
    '[Posts List Page] Delete Post',
    props<{ postId: string }>()
);

export const deletePostSuccess = createAction(
    '[Posts List Page] Delete Post Success',
    props<{ postId: string }>()
);

export const deletePostFailure = createAction(
    '[Posts List Page] Delete Post Failure',
    props<{ payload: HttpErrorResponse }>()
);