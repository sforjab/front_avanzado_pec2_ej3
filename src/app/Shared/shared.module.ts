import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "./Components/footer/footer.component";
import { HeaderComponent } from "./Components/header/header.component";
import { FormatDatePipe } from "./Pipes/format-date.pipe";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorService } from "./Services/auth-interceptor.service";

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
    ],
    providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
})
export class SharedModule { }