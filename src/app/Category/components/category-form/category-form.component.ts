import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryDTO } from 'src/app/Category/models/category.dto';
import * as CategoriesActions from '../../actions';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  userId: string;
  category: CategoryDTO;
  title: UntypedFormControl;
  description: UntypedFormControl;
  css_color: UntypedFormControl;

  categoryForm: UntypedFormGroup;
  isValidForm: boolean | null;

  private isUpdateMode: boolean;
  private categoryId: string | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.isValidForm = null;
    this.categoryId = this.activatedRoute.snapshot.paramMap.get('id');
    this.category = new CategoryDTO('', '', '');
    this.isUpdateMode = false;

    this.title = new UntypedFormControl(this.category.title, [
      Validators.required,
      Validators.maxLength(55),
    ]);

    this.description = new UntypedFormControl(this.category.description, [
      Validators.required,
      Validators.maxLength(255),
    ]);

    this.css_color = new UntypedFormControl(this.category.css_color, [
      Validators.required,
      Validators.maxLength(7),
    ]);

    this.userId = '';
    this.store.select('auth').subscribe((auth) => {
      if(auth.credentials.user_id) {
        this.userId = auth.credentials.user_id;
      }
    });

    this.store.select('categories').subscribe((category) => { // MIRAR SI ESTO ES REDUNDANTE (LA LÓGICA)
      this.category = category.category;

      this.title.setValue(this.category.title);

      this.description.setValue(this.category.description);

      this.css_color.setValue(this.category.css_color);

      this.categoryForm = this.formBuilder.group({
        title: this.title,
        description: this.description,
        css_color: this.css_color,
      });
    });



    this.categoryForm = this.formBuilder.group({
      title: this.title,
      description: this.description,
      css_color: this.css_color,
    });
  }

  ngOnInit(): void {
    let errorResponse: any;

    // update
    if (this.categoryId) {
      this.isUpdateMode = true;

      this.store.dispatch(CategoriesActions.getCategoryById({ categoryId: this.categoryId }))
    }
  }

  private editCategory(): void {
    if(this.userId) {
      this.store.dispatch(CategoriesActions.updateCategory({ category: this.category }));
    }
  }

  private createCategory(): void {
    if(this.userId) {
      this.store.dispatch(CategoriesActions.createCategory({ category: this.category }));
    }
  }

  saveCategory() {
    this.isValidForm = false;

    if (this.categoryForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.category = this.categoryForm.value;

    if (this.isUpdateMode) {
      this.editCategory();
    } else {
      this.createCategory();
    }
  }
}
