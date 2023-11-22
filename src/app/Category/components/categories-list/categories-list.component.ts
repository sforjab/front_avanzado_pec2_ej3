import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CategoryDTO } from 'src/app/Category/models/category.dto';
import { AppState } from 'src/app/app.reducer';
import * as CategoriesActions from '../../actions';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
})
export class CategoriesListComponent {
  categories: CategoryDTO[];
  userId: string;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {
    this.userId = '';
    this.categories = [];

    this.store.select('auth').subscribe((auth) => {
      if(auth.credentials.user_id) {
        this.userId = auth.credentials.user_id;
      }
    });

    this.loadCategories();

    this.store.select('categories').subscribe((categories) => {
      this.categories = categories.categories;
    });
  }

  private loadCategories(): void {
    let errorResponse: any;
    if (this.userId) {
      this.store.dispatch(CategoriesActions.getCategoriesByUserId({ userId: this.userId }));
    }
  }

  createCategory(): void {
    this.router.navigateByUrl('/user/category/');
  }

  updateCategory(categoryId: string): void {
    this.router.navigateByUrl('/user/category/' + categoryId);
  }

  deleteCategory(categoryId: string): void {

    // show confirmation popup
    let result = confirm(
      'Confirm delete category with id: ' + categoryId + ' .'
    );
    if (result) {
      this.store.dispatch(
        CategoriesActions.deleteCategory({ categoryId: categoryId })
      );
    }
  }
}
