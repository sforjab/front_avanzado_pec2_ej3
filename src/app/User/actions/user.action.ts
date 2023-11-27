import { createAction, props } from "@ngrx/store";
import { UserDTO } from "../models/user.dto";
import { HttpErrorResponse } from "@angular/common/http";

// Obtener un usuario por ID
export const getUserById = createAction(
    '[Profile Page] Get User By ID',
    props<{ userId: string }>()
);
  
export const getUserByIdSuccess = createAction(
    '[Profile Page] Get User By ID Success',
    props<{ userData: UserDTO }>()
);

export const getUserByIdFailure = createAction(
    '[Profile Page] Get User By ID Failure',
    props<{ payload: HttpErrorResponse }>()
);

// Actualizar un usuario
export const updateUser = createAction(
    '[Profile Page] Update User',
    props<{ userId: string, user: UserDTO }>()
);

export const updateUserSuccess = createAction(
    '[Profile Page] Update User Success',
    props<{ userData: UserDTO }>()
);

export const updateUserFailure = createAction(
    '[Profile Page] Update User Failure',
    props<{ payload: HttpErrorResponse }>()
);

// Registrar un nuevo usuario
export const register = createAction(
    '[Register Page] Register',
    props<{ user: UserDTO }>()
);

export const registerSuccess = createAction(
    '[Register Page] Register Success',
    props<{ userData: UserDTO }>()
);

export const registerFailure = createAction(
    '[Register Page] Register Failure',
    props<{ payload: HttpErrorResponse }>()
);