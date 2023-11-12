import { CategoryDTO } from "../models/category.dto";

export interface CategoriesState {
    categories: CategoryDTO[];
    category: CategoryDTO;
    loading: boolean;
    loaded: boolean;
    error: any;
}