import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CategoriesListComponent } from "./components/categories-list/categories-list.component";
import { CategoryFormComponent } from "./components/category-form/category-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations: [
        CategoriesListComponent,
        CategoryFormComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
    ],
    exports: [
        CategoriesListComponent,
        CategoryFormComponent
    ]
})
export class CategoryModule { }