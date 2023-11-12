import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryDTO } from 'src/app/Category/models/category.dto';
import { CategoryService } from 'src/app/Category/services/category.service';
import { LocalStorageService } from 'src/app/Shared/Services/local-storage.service';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  category: CategoryDTO;
  title: UntypedFormControl;
  description: UntypedFormControl;
  css_color: UntypedFormControl;

  categoryForm: UntypedFormGroup;
  isValidForm: boolean | null;

  private isUpdateMode: boolean;
  private validRequest: boolean;
  private categoryId: string | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private sharedService: SharedService,
    private localStorageService: LocalStorageService
  ) {
    this.isValidForm = null;
    this.categoryId = this.activatedRoute.snapshot.paramMap.get('id');
    this.category = new CategoryDTO('', '', '');
    this.isUpdateMode = false;
    this.validRequest = false;

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

      this.categoryService.getCategoryById(this.categoryId).subscribe(
        (categoryResult) => {
          this.category = categoryResult;

          this.title.setValue(this.category.title);

          this.description.setValue(this.category.description);

          this.css_color.setValue(this.category.css_color);

          this.categoryForm = this.formBuilder.group({
            title: this.title,
            description: this.description,
            css_color: this.css_color,
          });
        },
        (error) => {
          errorResponse = error.error;
          this.sharedService.errorLog(errorResponse);
        }
      );
    }
  }

  private editCategory(): void {
    let errorResponse: any;
    let responseOK: boolean = false;
    if (this.categoryId) {
      const userId = this.localStorageService.get('user_id');
      if (userId) {
        this.category.userId = userId;
        this.categoryService.updateCategory(this.categoryId, this.category)
        .pipe(
          finalize(async () => {
            await this.sharedService.managementToast(
              'categoryFeedback',
              responseOK,
              errorResponse
            );
      
            if (responseOK) {
              this.router.navigateByUrl('categories');
            }
          })
        )
        .subscribe(
          () => {
            responseOK = true;
          },
          (error) => {
            errorResponse = error.error;
            this.sharedService.errorLog(errorResponse);
          }
        );
      }
    }
  }

  private createCategory(): void {
    let errorResponse: any;
    let responseOK: boolean = false;
    const userId = this.localStorageService.get('user_id');
    if (userId) {
      this.category.userId = userId;
      this.categoryService.createCategory(this.category)
      .pipe(
        finalize(async () => {
          await this.sharedService.managementToast(
            'categoryFeedback',
            responseOK,
            errorResponse
          );
    
          if (responseOK) {
            this.router.navigateByUrl('categories');
          }
        })
      )
      .subscribe(
        () => {
          responseOK = true;
        },
        (error) => {
          errorResponse = error.error;
          this.sharedService.errorLog(errorResponse);
        }
      );
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