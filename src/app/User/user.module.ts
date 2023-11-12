import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfileComponent } from "./components/profile/profile.component";
import { RegisterComponent } from "./components/register/register.component";

@NgModule({
    declarations: [
        ProfileComponent,
        RegisterComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ProfileComponent,
        RegisterComponent
    ]
})
export class UserModule { }