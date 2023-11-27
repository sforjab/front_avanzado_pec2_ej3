import { createAction, props } from "@ngrx/store";
import { CategoryDTO } from "../models/category.dto";
import { HttpErrorResponse } from "@angular/common/http";

// Obtener categorías por ID de usuario
export const getCategoriesByUserId = createAction(
    '[Categories List Page] Get Categories By User ID',
    props<{ userId: string }>()
);

export const getCategoriesByUserIdSuccess = createAction(
    '[Categories List Page] Get Categories By User ID Success',
    props<{ categories: CategoryDTO[] }>()
);

export const getCategoriesByUserIdFailure = createAction(
    '[Categories List Page] Get Categories By User ID Failure',
    props<{ payload: HttpErrorResponse }>()
);

// Obtener categoría por ID
export const getCategoryById = createAction(
    '[Category Form Page] Get Category By ID',
    props<{ categoryId: string }>()
);

export const getCategoryByIdSuccess = createAction(
    '[Category Form Page] Get Category By ID Success',
    props<{ category: CategoryDTO }>()
);

export const getCategoryByIdFailure = createAction(
    '[Category Form Page] Get Category By ID Failure',
    props<{ payload: HttpErrorResponse }>()
);

// Crear una nueva categoría
export const createCategory = createAction(
    '[Category Form Page] Create Category',
    props<{ category: CategoryDTO }>()
);

export const createCategorySuccess = createAction(
    '[Category Form Page] Create Category Success',
    props<{ category: CategoryDTO }>()
);

export const createCategoryFailure = createAction(
    '[Category Form Page] Create Category Failure',
    props<{ payload: HttpErrorResponse }>()
);

// Actualizar categoría
export const updateCategory = createAction(
    '[Category Form Page] Update Category',
    props<{ categoryId: string, category: CategoryDTO }>()
);

export const updateCategorySuccess = createAction(
    '[Category Form Page] Update Category Success',
    props<{ category: CategoryDTO }>()
);

export const updateCategoryFailure = createAction(
    '[Category Form Page] Update Category Failure',
    props<{ payload: HttpErrorResponse }>()
);

// Eliminar categoría
export const deleteCategory = createAction(
    '[Categories List Page] Delete Category',
    props<{ categoryId: string }>()
);

export const deleteCategorySuccess = createAction(
    '[Categories List Page] Delete Category Success',
    props<{ categoryId: string }>()
);

export const deleteCategoryFailure = createAction(
    '[Categories List Page] Delete Category Failure',
    props<{ payload: HttpErrorResponse }>()
);