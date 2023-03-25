import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserEntry } from 'src/app/core/schemas/users.schema';
import { selectUserErrorMessage, selectUserLoading, selectUserSaving } from 'src/app/core/store/selectors/users.selector';
import * as userAction from '../../../core/store/actions/users.action';

@Component({
  selector: 'app-user-add-modal',
  templateUrl: './user-add-modal.component.html',
  styleUrls: ['./user-add-modal.component.scss']
})
export class UserAddModalComponent implements OnInit {

  public UserAddForm: FormGroup;
  isSaving$: Observable<boolean>;
  loading$: Observable<boolean>;
  errorMessage$: Observable<string>;
  invalid = false;
  invalidMessage: string;
  public unsubscribeAll: Subject<boolean>;

  constructor(protected store: Store, private dialogRef: MatDialogRef<UserAddModalComponent>) {
    this.UserAddForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.min(2), Validators.max(50)]),
      role: new FormControl('', [Validators.required, Validators.min(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.isSaving$ = this.store.pipe(
      select(selectUserSaving),
      takeUntil(this.unsubscribeAll)
    );

    this.loading$ = this.store.pipe(
      select(selectUserLoading),
      takeUntil(this.unsubscribeAll)
    );

    this.errorMessage$ = this.store.pipe(
      select(selectUserErrorMessage),
      takeUntil(this.unsubscribeAll)
    );
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  onSubmit(): void {
    if (this.UserAddForm.invalid) return;
    console.log(this.UserAddForm.value);
    this.store.dispatch(userAction.userSaveRequested({
      input: this.UserAddForm.value
    }));

    this.isSaving$.subscribe(saving => {
      if (!saving) {
        this.errorMessage$.subscribe(error => {
          if (!error) { this.dialogRef.close(); }
        });
      }
    });
  }

  getErrorMessage(): any {
    if (this.UserAddForm.get('email').hasError('required') ) {
      return 'Please fill the email';
    } else if (this.UserAddForm.get('role').hasError('required')) {
      return 'Please select a role';
    }
    return this.UserAddForm.get('email').hasError('email') ? 'invalid email' : '';
  }

}
