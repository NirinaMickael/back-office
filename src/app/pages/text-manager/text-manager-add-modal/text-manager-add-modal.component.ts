import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  selectTextSaving,
  selectTextLoading,
  selectTextError,
} from 'src/app/core/store/selectors/texts.selector';
import * as textAction from '../../../core/store/actions/texts.action';
import { pageList } from 'src/app/shared/pages-index';
@Component({
  selector: 'app-text-manager-add-modal',
  templateUrl: './text-manager-add-modal.component.html',
  styleUrls: ['./text-manager-add-modal.component.scss'],
})
export class TextManagerAddModalComponent implements OnInit {
  public TextAddForm: FormGroup;
  isSaving$: Observable<boolean>;
  loading$: Observable<boolean>;
  errorMessage$: Observable<string>;
  invalid = false;
  invalidMessage: string;
  public unsubscribeAll: Subject<boolean>;

  pages = pageList;

  constructor(
    protected store: Store,
    private dialogRef: MatDialogRef<TextManagerAddModalComponent>
  ) {
    this.TextAddForm = new FormGroup({
      page: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      subtitle: new FormControl('', [Validators.required]),
    });
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.isSaving$ = this.store.pipe(
      select(selectTextSaving),
      takeUntil(this.unsubscribeAll)
    );

    this.loading$ = this.store.pipe(
      select(selectTextLoading),
      takeUntil(this.unsubscribeAll)
    );

    this.errorMessage$ = this.store.pipe(
      select(selectTextError),
      takeUntil(this.unsubscribeAll)
    );
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  onSubmit(): void {
    if (this.TextAddForm.invalid) return;

    this.store.dispatch(
      textAction.textSaveRequested({
        input: this.TextAddForm.value,
      })
    );

    this.isSaving$.subscribe((saving) => {
      if (!saving) {
        this.errorMessage$.subscribe((error) => {
          if (!error) {
            this.dialogRef.close();
          }
        });
      }
    });
  }
}
