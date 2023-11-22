import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { HeaderMenus } from 'src/app/Shared/Models/header-menus.dto';
import { HeaderMenusService } from 'src/app/Shared/Services/header-menus.service';
import { logout } from '../../../Auth/actions';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showAuthSection: boolean;
  showNoAuthSection: boolean;

  constructor(
    private router: Router,
    private headerMenusService: HeaderMenusService,
    private store: Store<AppState>
  ) {
    this.showAuthSection = false;
    this.showNoAuthSection = true;
  }

  ngOnInit(): void {
    this.headerMenusService.headerManagement.subscribe(
      (headerInfo: HeaderMenus) => {
        if (headerInfo) {
          this.showAuthSection = headerInfo.showAuthSection;
          this.showNoAuthSection = headerInfo.showNoAuthSection;
        }
      }
    );
  }

  dashboard(): void {
    this.router.navigateByUrl('dashboard');
  }

  home(): void {
    this.router.navigateByUrl('home');
  }

  login(): void {
    this.router.navigateByUrl('login');
  }

  register(): void {
    this.router.navigateByUrl('register');
  }

  adminPosts(): void {
    this.router.navigateByUrl('posts');
  }

  adminCategories(): void {
    this.router.navigateByUrl('categories');
  }

  profile(): void {
    this.router.navigateByUrl('profile');
  }

  logout(): void {
    /* this.localStorageService.remove('user_id');
    this.localStorageService.remove('access_token');

    const headerInfo: HeaderMenus = {
      showAuthSection: false,
      showNoAuthSection: true,
    };

    this.headerMenusService.headerManagement.next(headerInfo); */

    this.store.dispatch(logout());
    this.router.navigateByUrl('home');
  }
}
