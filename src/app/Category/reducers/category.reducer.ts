import { Action, createAction, createReducer } from "@ngrx/store";

import { CategoryDTO } from "../models/category.dto";

export interface CategoriesState {
    categories: CategoryDTO[];
    category: CategoryDTO;
    loading: boolean;
    loaded: boolean;
    error: any;
}

export const initialState: CategoriesState = {
    categories: [],
    category: new CategoryDTO('', '', ''),
    loading: false,
    loaded: false,
    error: null
};

const _categoriesReducer = createReducer(
    initialState
);

export function categoriesReducer(state: CategoriesState | undefined, action: Action) {
    return _categoriesReducer(state, action);
}