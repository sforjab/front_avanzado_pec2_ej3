import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CategoriesListComponent } from "./components/categories-list/categories-list.component";
import { CategoryFormComponent } from "./components/category-form/category-form.component";

@NgModule({
    declarations: [
        CategoriesListComponent,
        CategoryFormComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        CategoriesListComponent,
        CategoryFormComponent
    ]
})
export class CategoryModule { }