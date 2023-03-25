import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SnackbarService } from 'src/app/core/services/snackbar/snackbar.service';
import {
  selectSliderSaving,
  selectSliderLoading,
  selectSliderError,
} from 'src/app/core/store/selectors/slider.selector';
  import * as sliderAction from '../../../core/store/actions/sliders.action';

@Component({
  selector: 'app-slider-manager-add',
  templateUrl: './slider-manager-add.component.html',
  styleUrls: ['./slider-manager-add.component.scss'],
})
export class SliderManagerAddComponent implements OnInit {
  public SliderAddForm: FormGroup;
  isSaving$: Observable<boolean>;
  loading$: Observable<boolean>;
  errorMessage$: Observable<string>;
  public unsubscribeAll: Subject<boolean>;

  constructor(
    protected store: Store,
    private dialogRef: MatDialogRef<SliderManagerAddComponent>,
    private snackbarService: SnackbarService
  ) {
    this.SliderAddForm = new FormGroup({
      type: new FormControl('', [Validators.required]),
    });
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.isSaving$ = this.store.pipe(
      select(selectSliderSaving),
      takeUntil(this.unsubscribeAll)
    );

    this.loading$ = this.store.pipe(
      select(selectSliderLoading),
      takeUntil(this.unsubscribeAll)
    );

    this.errorMessage$ = this.store.pipe(
      select(selectSliderError),
      takeUntil(this.unsubscribeAll)
    );
  }

  onSubmit(event): void {
    if (this.SliderAddForm.get('type').invalid)
      this.snackbarService.openSnackBarAlert('error', 'Please fill the type');

    let obj;
    let filenames = [];
    if (event && event.length) {
      event.forEach((e) => {
        filenames.push({
          index: 1,
          name: e.name,
        });
      });
    }

    obj = {
      type: this.SliderAddForm.get('type').value,
      filenames,
    };

    this.store.dispatch(
      sliderAction.sliderSaveRequested({
        input: obj,
      })
    );

    this.isSaving$.subscribe((saving) => {
      if (!saving) {
        this.errorMessage$.subscribe((error) => {
          if (!error) {
            this.store.dispatch(sliderAction.sliderLoadRequested());
            this.dialogRef.close()
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
