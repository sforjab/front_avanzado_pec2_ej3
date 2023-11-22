import { createAction, props } from "@ngrx/store";
import { UserDTO } from "../models/user.dto";
import { HttpErrorResponse } from "@angular/common/http";

// Action para obtener un usuario por ID
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

// Action para actualizar un usuario
export const updateUser = createAction(
    '[Profile Page] Update User',
    props<{ userId: string, user: UserDTO }>()
);

export const updateUserSuccess = createAction(
    '[Profile Page] Update User Success'
);

export const updateUserFailure = createAction(
    '[Profile Page] Update User Failure',
    props<{ payload: HttpErrorResponse }>()
);

// Action para registrar un usuario
export const register = createAction(
    '[Register Page] Register',
    props<{ user: UserDTO }>()
);

export const registerSuccess = createAction(
    '[Register Page] Register Success'
);

export const registerFailure = createAction(
    '[Register Page] Register Failure',
    props<{ payload: HttpErrorResponse }>()
);