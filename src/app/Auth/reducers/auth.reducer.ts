import { createAction } from "@ngrx/store";
import { AuthDTO } from "../models/auth.dto";

export interface AuthState {
    credentials: AuthDTO;
    loading: boolean;
    loaded: boolean;
    error: any;
}

export const login = createAction('[Login Component] Login');