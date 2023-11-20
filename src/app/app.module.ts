import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptorService } from './Shared/Services/auth-interceptor.service';
import { AuthModule } from './Auth/auth.module';
import { CategoryModule } from './Category/category.module';
import { PostModule } from './Post/post.module';
import { UserModule } from './User/user.module';
import { SharedModule } from './Shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsArray, appReducers } from './app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    /* ReactiveFormsModule,
    HttpClientModule, */
    AuthModule,
    CategoryModule,
    PostModule,
    UserModule,
    SharedModule,
    StoreModule.forRoot( appReducers ),
    EffectsModule.forRoot(EffectsArray),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
