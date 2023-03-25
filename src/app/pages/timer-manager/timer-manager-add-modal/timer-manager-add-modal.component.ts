import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TextEntry } from 'src/app/core/schemas/text.schema';
import { SnackbarService } from 'src/app/core/services/snackbar/snackbar.service';
import { selectTextSaving, selectTextLoading, selectTextError, selectAllTexts } from 'src/app/core/store/selectors/texts.selector';
import * as textAction from '../../../core/store/actions/texts.action';
import { pageList } from 'src/app/shared/pages-index'

@Component({
  selector: 'app-timer-manager-add-modal',
  templateUrl: './timer-manager-add-modal.component.html',
  styleUrls: ['./timer-manager-add-modal.component.scss']
})
export class TimerManagerAddModalComponent implements OnInit {

  public TextAddForm: FormGroup;
  isSaving$: Observable<boolean>;
  loading$: Observable<boolean>;
  errorMessage$: Observable<string>;
  invalid = false;
  invalidMessage: string;
  public unsubscribeAll: Subject<boolean>;
  texts$: Observable<TextEntry[]>;
  texts: TextEntry[];
  isIntro: Boolean = false;

  pages = pageList

  constructor(
    protected store: Store, 
    private dialogRef: MatDialogRef<TimerManagerAddModalComponent>,
    private snackbar: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: TextEntry
  ) {
    this.TextAddForm = new FormGroup({
      page: new FormControl('', [Validators.required]),
      second: new FormControl('', [Validators.required, Validators.min(0), Validators.max(59)]),
      minute: new FormControl('', [Validators.required, Validators.min(0), Validators.max(59)]),
      timeBeforeTransition: new FormControl(''),
    });

    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.isSaving$ = this.store.pipe(
      select(selectTextSaving),
      takeUntil(this.unsubscribeAll)
    );

    this.store.dispatch(textAction.textLoadRequested());
    this.texts$ = this.store.select(selectAllTexts);

    this.texts$.subscribe((texts) => {
      this.texts = texts
      if (this.data && this.data._id && this.data.page) {
        if(this.data.isIntro) this.isIntro = true;
        this.TextAddForm.get('page').setValue(this.data.page)
        this.loadTimeIfExist();
      }
    });

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
    if (this.isIntro) {
      this.TextAddForm.get('timeBeforeTransition').setValidators([Validators.required, Validators.min(0), Validators.max(15)]);
      this.TextAddForm.get('timeBeforeTransition').updateValueAndValidity();
    }
    if (this.TextAddForm.invalid) return;
    const timeInSecond = +this.TextAddForm.get('second').value + (+this.TextAddForm.get('minute').value * 60)
    let timebfrTrans = 0;
    
    if(this.isIntro) {
      timebfrTrans = this.TextAddForm.get('timeBeforeTransition').value;
      if(timebfrTrans > timeInSecond) {
        this.snackbar.openSnackBarAlert('error', "Time before transition cannot be greater than the chrono");
        this.isIntro = false;
        this.dialogRef.close(); 
        return;
      }
    }
    

    const concernedPage = this.texts.find(e => e.page == this.TextAddForm.get('page').value)

    if (concernedPage) {
      this.store.dispatch(textAction.textUpdateRequested({
        body: {
          ...concernedPage,
          timeInSecond,
          page: this.TextAddForm.get('page').value,
          timer: true,
          timeBeforeTransition: timebfrTrans
        },
        param: concernedPage._id
      }));
    } else {
      this.store.dispatch(textAction.textSaveRequested({
        input: ({
          timeInSecond,
          timer: true,
          page: this.TextAddForm.get('page').value,
          timeBeforeTransition: timebfrTrans
        } as any)
      }));
    }

    this.isSaving$.subscribe(saving => {
      if (!saving) {
        this.errorMessage$.subscribe(error => {
          if (!error) {             
            this.isIntro = false;
            this.dialogRef.close(); 
          }
        });
      }
    });
  }

  loadTimeIfExist(): void {
    const concernedPage = this.texts.find(e => e.page == this.TextAddForm.get('page').value)
    if (concernedPage && concernedPage.timeInSecond) {
      this.isIntro = false;
      const minutes = Math.floor(concernedPage.timeInSecond / 60);
      const seconds = concernedPage.timeInSecond - minutes * 60;
      this.TextAddForm.get('second').setValue(seconds)
      this.TextAddForm.get('minute').setValue(minutes)
      if(concernedPage.isIntro) this.isIntro = true;
      if(concernedPage.timeBeforeTransition) this.TextAddForm.get('timeBeforeTransition').setValue(concernedPage.timeBeforeTransition);
    } else {
      this.TextAddForm.get('second').setValue(undefined)
      this.TextAddForm.get('minute').setValue(undefined)
      this.TextAddForm.get('timeBeforeTransition').setValue(undefined);
    }
  }
}
