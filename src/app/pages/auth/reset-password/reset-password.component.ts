import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AccountState } from 'src/app/core/schemas/users.schema';
import { selectAccountLoading, selectAccountErrorMessage } from 'src/app/core/store/selectors/account.selector';
import * as AccountAction from '../../../core/store/actions/account.action';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  @Input() token: string;
  public ResetForm: FormGroup;
  public submitting$: Observable<boolean>;
  public errorMessage$: Observable<any>;
  public unsubscribeAll: Subject<boolean>;
  public hide = true;
  public hideConfirm = true;
  public loading$: Observable<boolean>;
  public loginError: any;

  @Output() switchDisplayMode = new EventEmitter<any>();
  @Input() displayMode: any;

  constructor(protected store: Store<AccountState>, private router: Router, private route: ActivatedRoute) {
    this.ResetForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      passwordConfirm: new FormControl('', [Validators.required]),
    });

    this.unsubscribeAll = new Subject();
  }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.loading$ = this.store.pipe(
      select(selectAccountLoading),
      takeUntil(this.unsubscribeAll)
    );
    this.submitting$ = this.store.pipe(
      select(selectAccountLoading),
      takeUntil(this.unsubscribeAll)
    );
    this.errorMessage$ = this.store.pipe(
      select(selectAccountErrorMessage),
      takeUntil(this.unsubscribeAll)
    );
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  onSubmit(): void {
    this.loginError = undefined;
    if (this.ResetForm.invalid) {
      return;
    }
    if (this.ResetForm.get('password').value !== this.ResetForm.get('passwordConfirm').value) {
      this.loginError = 'Passwords are unmatched';
      return;
    }
    this.store.dispatch(
      AccountAction.resetPasswordRequested({
        param: this.token, body: {
          password: this.ResetForm.get('password').value
        }
      })
    );
    this.submitting$.subscribe(
      submitting => {
        if (!submitting) {
          this.errorMessage$.subscribe(
            errorM => {
              if (!errorM) {
                this.router.navigate(['/']);
              } else {
                this.loginError = errorM;
              }
            }
          );
        }
      }
    );
  }
}
