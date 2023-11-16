import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "./Components/footer/footer.component";
import { HeaderComponent } from "./Components/header/header.component";
import { FormatDatePipe } from "./Pipes/format-date.pipe";

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        FormatDatePipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        FormatDatePipe
    ]
})
export class SharedModule { }