import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectCategorySaving, selectCategoryLoading, selectCategoryErrorMessage } from 'src/app/core/store/selectors/category.selector';
import * as caterogyAction from "../../../core/store/actions/category.action";
@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent {
  public CategoryAddForm: FormGroup;
  isSaving$: Observable<boolean>;
  loading$: Observable<boolean>;
  errorMessage$: Observable<string>;
  invalid = false;
  invalidMessage: string;
  public unsubscribeAll: Subject<boolean>;
  imageUrl !: string;
  isUploaded !:boolean;
  isUploadedImage !:boolean;
  constructor(protected store: Store, private dialogRef: MatDialogRef<CategoryAddComponent> , private formBuilder : FormBuilder) {
    this.CategoryAddForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description : ["",Validators.required],
  });
  this.isUploaded = false;
  this.isUploadedImage = false;
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.isSaving$ = this.store.pipe(
      select(selectCategorySaving),
      takeUntil(this.unsubscribeAll)
    );

    this.loading$ = this.store.pipe(
      select(selectCategoryLoading),
      takeUntil(this.unsubscribeAll)
    );

    this.errorMessage$ = this.store.pipe(
      select(selectCategoryErrorMessage),
      takeUntil(this.unsubscribeAll)
    );
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  onSubmit(): void {
    if (this.CategoryAddForm.invalid) return;

    this.store.dispatch(caterogyAction.categorySaveRequested({
      input: this.CategoryAddForm.value
    }));

    this.isSaving$.subscribe(saving => {
      if (!saving) {
        this.errorMessage$.subscribe(error => {
          if (!error) { this.dialogRef.close(); }
        });
      }
    });
  }
  onUploadFile(e:Event){
    let  file  = e as any;
    console.log(file);
    this.CategoryAddForm.controls['image'].setValue(file[0].location);
    this.isUploadedImage = true;
  }
  getErrorMessage(champ:string): any {
    return this.CategoryAddForm.get(champ).hasError(champ) ? `${champ} error` : '';
  }
}
