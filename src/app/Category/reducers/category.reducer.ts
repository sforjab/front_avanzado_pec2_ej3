import { Action, createReducer, on } from "@ngrx/store";

import { CategoryDTO } from "../models/category.dto";
import * as CategoriesActions from "../actions";

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
    initialState,
    on(CategoriesActions.getCategoriesByUserId, state => ({
        ...state,
        loading: true,
        loaded: false,
        error: null
    })),
    on(CategoriesActions.getCategoriesByUserIdSuccess, (state, { categories }) => ({
        ...state,
        categories,
        loading: false,
        loaded: true,
        error: null
    })),
    on(CategoriesActions.getCategoriesByUserIdFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: true,
        error: { payload }
    })),
    on(CategoriesActions.getCategoryById, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null
    })),
    on(CategoriesActions.getCategoryByIdSuccess, (state, { category }) => ({
        ...state,
        category,
        loading: false,
        loaded: true,
        error: null
    })),
    on(CategoriesActions.getCategoryByIdFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: true,
        error: { payload }
    })),
    on(CategoriesActions.createCategory, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null
    })),
    on(CategoriesActions.createCategorySuccess, (state, { category }) => ({
        ...state,
        categories: [...state.categories, category],
        loading: false,
        loaded: true,
        error: null
    })),
    on(CategoriesActions.createCategoryFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: true,
        error: { payload }
    })),
    on(CategoriesActions.updateCategory, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null
    })),
    on(CategoriesActions.updateCategorySuccess, (state, { category }) => ({
            ...state,
            categories: state.categories.map(cat => cat.categoryId === category.categoryId ? category : cat),
            loading: false,
            loaded: true,
            error: null
        })
    ),
    on(CategoriesActions.updateCategoryFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: true,
        error: { payload }
    })),
    on(CategoriesActions.deleteCategory, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null
    })),
    on(CategoriesActions.deleteCategorySuccess, (state, { categoryId }) => ({
        ...state,
        categories: state.categories.filter(cat => cat.categoryId !== categoryId),
        loading: false,
        loaded: true,
        error: null
    })),
    on(CategoriesActions.deleteCategoryFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: true,
        error: { payload }
    })),
);

export function categoriesReducer(state: CategoriesState | undefined, action: Action) {
    return _categoriesReducer(state, action);
}