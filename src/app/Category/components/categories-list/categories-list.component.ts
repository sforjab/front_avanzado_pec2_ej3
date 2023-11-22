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
  }

  private loadCategories(): void {
    let errorResponse: any;
    /* const userId = this.localStorageService.get('user_id'); */
    if (this.userId) {
      this.store.dispatch(CategoriesActions.getCategoriesByUserId({ userId: this.userId }));
      /* this.categoryService.getCategoriesByUserId(userId).subscribe(
        (categoriesResult) => {
          this.categories = categoriesResult;
        },
        (error) => {
          errorResponse = error.error;
          this.sharedService.errorLog(errorResponse);
        }
      ); */
    }
  }

  createCategory(): void {
    this.router.navigateByUrl('/user/category/');
  }

  updateCategory(categoryId: string): void {
    this.router.navigateByUrl('/user/category/' + categoryId);
  }

  deleteCategory(categoryId: string): void {
    let errorResponse: any;

    // show confirmation popup
    let result = confirm(
      'Confirm delete category with id: ' + categoryId + ' .'
    );
    if (result) {
      this.categoryService.deleteCategory(categoryId)
      .subscribe(
        (rowsAffected) => {
          if (rowsAffected.affected > 0) {
            this.loadCategories();
          }
        },
        (error) => {
          errorResponse = error.error;
          this.sharedService.errorLog(errorResponse);
        }
      );
    }
  }
}
