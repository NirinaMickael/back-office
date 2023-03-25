import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit, OnDestroy {
  // showSnackbar$: Observable<boolean>;
  unsubscribeAll: Subject<boolean>;
  
  constructor(
    public snackBarRef: MatSnackBarRef<SnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
  ) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    
    // this.showSnackbar$ = this.store.pipe(
    //   takeUntil(this.unsubscribeAll),
    //   select(selectSnackbarShow)
    // );
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  // tslint:disable-next-line: typedef
  onCloseSnackbar() {
    this.snackBarRef.dismiss()
  }

}
