import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TextEntry } from 'src/app/core/schemas/text.schema';
import { selectTextSaving, selectTextLoading, selectTextError } from 'src/app/core/store/selectors/texts.selector';
import * as textAction from '../../../core/store/actions/texts.action';
import { pageList } from 'src/app/shared/pages-index'

@Component({
  selector: 'app-text-manager-edit-modal',
  templateUrl: './text-manager-edit-modal.component.html',
  styleUrls: ['./text-manager-edit-modal.component.scss']
})
export class TextManagerEditModalComponent implements OnInit {

  public TextEditForm: FormGroup;
  isSaving$: Observable<boolean>;
  loading$: Observable<boolean>;
  errorMessage$: Observable<string>;
  invalid = false;
  invalidMessage: string;
  public unsubscribeAll: Subject<boolean>;

  pages = pageList

  constructor(@Inject(MAT_DIALOG_DATA) public data: TextEntry, protected store: Store, private dialogRef: MatDialogRef<TextManagerEditModalComponent>) {
    this.TextEditForm = new FormGroup({
      page: new FormControl(data.page, [Validators.required]),
      title: new FormControl(data.title, [Validators.required]),
      subtitle: new FormControl(data.subtitle, [Validators.required]),
      // sequence: new FormControl(data.sequence, [Validators.required]),
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
    if (this.TextEditForm.invalid) return;

    this.store.dispatch(textAction.textUpdateRequested({
      body: this.TextEditForm.value,
      param: this.data._id
    }));


    this.isSaving$.subscribe(saving => {
      if (!saving) {
        this.errorMessage$.subscribe(error => {
          if (!error) { this.dialogRef.close(); }
        });
      }
    });
  }

}
