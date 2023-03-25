import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserEntry } from 'src/app/core/schemas/users.schema';
import { userUpdateRequested } from 'src/app/core/store/actions/users.action';
import { PasswordService } from 'src/app/core/services/compare/password.service';
import { selectAccountLoading } from 'src/app/core/store/selectors/account.selector';
@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.scss'],
})
export class EditProfilComponent implements OnInit {
  public EditMyProfilForm: FormGroup;
  public loading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UserEntry,
    protected store: Store,
    private dialogRef: MatDialogRef<EditProfilComponent>,
    private passwordService: PasswordService
  ) {
    console.log(data);
    this.EditMyProfilForm = new FormGroup({
      name: new FormControl(data.name, [Validators.min(2), Validators.max(50)]),
      email: new FormControl(data.email, [Validators.email]),
      currentpassword: new FormControl(),
      password: new FormControl(),
      role: new FormControl(data.role, [Validators.min(1)]),
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.loading = true;
    this.store.dispatch(
      userUpdateRequested({
        param: this.data._id,
        body: this.EditMyProfilForm.value,
      })
    );

    this.store.select(selectAccountLoading).subscribe((loading: any) => {
      if (!loading) {
        this.loading = true;
        this.dialogRef.close();
      } else {
        this.loading = false;
      }
    });
  }

  getErrorMessage(): any {
    if (this.EditMyProfilForm.get('email').hasError('email')) {
      return 'Please fill the email';
    }

    if (this.EditMyProfilForm.get('name').hasError('min')) {
      return 'Please the min length name 2';
    } else if (this.EditMyProfilForm.get('name').hasError('max')) {
      return 'Please the max length name 50';
    }

    if (this.EditMyProfilForm.get('role').hasError('role')) {
      return 'Please choose your role';
    }
  }
}
