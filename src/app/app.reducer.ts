import { ActionReducerMap } from '@ngrx/store';

import * as AuthReducer from './Auth/reducers';
import * as CategoriesReducer from './Category/reducers';
import * as PostsReducer from './Post/reducers';
import * as UserReducer from './User/reducers';

export interface AppState {
    auth: AuthReducer.AuthState;
    categories: CategoriesReducer.CategoriesState;
    posts: PostsReducer.PostsState;
    user: UserReducer.UserState;
}

export const appReducers: ActionReducerMap<AppState> = {
    auth: AuthReducer.authReducer,
    categories: CategoriesReducer.categoriesReducer,
    posts: PostsReducer.postsReducer,
    user: UserReducer.userReducer
};

 export const EffectsArray: any = [
    AuthEffects,
 /*   CategoriesEffects,
    PostsEffects,
    UserEffects*/
]; 