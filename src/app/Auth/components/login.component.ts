import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthDTO } from 'src/app/Auth/models/auth.dto';
import { HeaderMenus } from 'src/app/Shared/Models/header-menus.dto';
import { AuthService } from 'src/app/Auth/services/auth.service';
import { HeaderMenusService } from 'src/app/Shared/Services/header-menus.service';
import { LocalStorageService } from 'src/app/Shared/Services/local-storage.service';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import { finalize } from 'rxjs/operators';
import { AuthState } from '../reducers/auth.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginUser: AuthDTO;
  email: UntypedFormControl;
  password: UntypedFormControl;
  loginForm: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    private sharedService: SharedService,
    private headerMenusService: HeaderMenusService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private store: Store<AuthState>
  ) {
    this.loginUser = new AuthDTO('', '', '', '');

    this.email = new UntypedFormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.password = new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
    ]);

    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
  }

  ngOnInit(): void {}

  login(): void {
    let responseOK: boolean = false;
    let errorResponse: any;

    this.loginUser.email = this.email.value;
    this.loginUser.password = this.password.value;

    this.authService.login(this.loginUser)
    .pipe( 
      finalize(async () => { // Queremos que esta lógica se ejecute siempre tras la lógica del subscribe
        await this.sharedService.managementToast(
          'loginFeedback',
          responseOK,
          errorResponse
        );

        if(responseOK) {
          const headerInfo: HeaderMenus = {
            showAuthSection: true,
            showNoAuthSection: false,
          };
          // update options menu
          this.headerMenusService.headerManagement.next(headerInfo);
          this.router.navigateByUrl('home');
        }
      })
    )
    .subscribe(
      (authToken) => {
        // Respuesta exitosa
        responseOK = true;
        this.loginUser.user_id = authToken.user_id;
        this.loginUser.access_token = authToken.access_token;
        // save token to localstorage for next requests
        this.localStorageService.set('user_id', this.loginUser.user_id);
        this.localStorageService.set('access_token', this.loginUser.access_token);
      },
      (error) => {
        // Manejo de errores
        responseOK = false;
        errorResponse = error.error;

        const headerInfo: HeaderMenus = {
          showAuthSection: false,
          showNoAuthSection: true,
        };

        this.headerMenusService.headerManagement.next(headerInfo);
        this.sharedService.errorLog(error.error);
      }
    );
  }
}
