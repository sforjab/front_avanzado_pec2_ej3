import { UserDTO } from "../models/user.dto";


export interface UserState {
    user: UserDTO;
    loading: boolean;
    loaded: boolean;
    error: any;
}