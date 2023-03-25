import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserEntry } from 'src/app/core/schemas/users.schema';
import { userUpdateRequested } from 'src/app/core/store/actions/users.action';
import { selectUserErrorMessage, selectUserLoading, selectUserSaving } from 'src/app/core/store/selectors/users.selector';

@Component({
  selector: 'app-user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.scss']
})
export class UserEditModalComponent implements OnInit {

  public UserEditForm: FormGroup;
  isSaving$: Observable<boolean>;
  loading$: Observable<boolean>;
  errorMessage$: Observable<string>;
  invalid = false;
  invalidMessage: string;
  public unsubscribeAll: Subject<boolean>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: UserEntry, protected store: Store, private dialogRef: MatDialogRef<UserEditModalComponent>) { 
    this.UserEditForm = new FormGroup({
      name: new FormControl(data.name, [Validators.required, Validators.min(2), Validators.max(50)]),
      email: new FormControl(data.email, [Validators.required, Validators.email]),
      role: new FormControl(data.role, [Validators.required, Validators.min(4)]),
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
    if (this.UserEditForm.status === 'VALID') {
      this.store.dispatch(
        userUpdateRequested({
          param: this.data._id,
          body: this.UserEditForm.value,
        })
      );
      this.isSaving$.subscribe((saving) => {
        if (!saving) {
          this.errorMessage$.subscribe(error => {
            if (!error) {
              this.dialogRef.close();
            }
          });
        }
      });
    }
  }

  getErrorMessage(): any {
    if (this.UserEditForm.get('email').hasError('required') ) {
      return 'Please fill the email';
    } else if (this.UserEditForm.get('role').hasError('required')) {
      return 'Please select a role';
    }
    return this.UserEditForm.get('email').hasError('email') ? 'invalid email' : '';
  }

}
