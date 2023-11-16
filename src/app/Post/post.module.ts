import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { HomeComponent } from "./components/home/home.component";
import { PostFormComponent } from "./components/post-form/post-form.component";
import { PostsListComponent } from "./components/posts-list/posts-list.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from "../Shared/shared.module";

@NgModule({
    declarations: [
        DashboardComponent,
        HomeComponent,
        PostFormComponent,
        PostsListComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        SharedModule
    ],
    exports: [
        DashboardComponent,
        HomeComponent,
        PostFormComponent,
        PostsListComponent
    ]
})
export class PostModule { }