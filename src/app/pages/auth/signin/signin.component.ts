import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserState } from 'src/app/core/schemas/users.schema';
import { selectAccountErrorMessage, selectAccountLoading } from 'src/app/core/store/selectors/account.selector';
import * as AccountAction from '../../../core/store/actions/account.action';

enum DisplayMode {
  Login,
  Forgot,
  Reset
}

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public AccountForm: FormGroup;
  public submitting$: Observable<boolean>;
  public errorMessage$: Observable<any>;
  public unsubscribeAll: Subject<boolean>;
  public hide = true;
  public loading$: Observable<boolean>;
  public loginError: any;
  public mode = DisplayMode.Login;
  public displayMode = DisplayMode;
  token: string;

  constructor(protected store: Store<UserState>, private router: Router, private route: ActivatedRoute) {
    this.AccountForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
    this.unsubscribeAll = new Subject();
  }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.loading$ = this.store.select(selectAccountLoading);
    this.submitting$ = this.store.pipe(
      select(selectAccountLoading),
      takeUntil(this.unsubscribeAll)
    );
    this.errorMessage$ = this.store.pipe(
      select(selectAccountErrorMessage),
      takeUntil(this.unsubscribeAll)
    );

    this.getToken();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  onSubmit(): void {

    this.loginError = undefined;
    if (this.AccountForm.invalid) {
      return;
    }
    let payload = {
      ...this.AccountForm.value,
      fromBo: true,
    }
    this.store.dispatch(
      AccountAction.accountLoginRequested({ input: payload })
    );
    this.errorMessage$.subscribe(
      errorM => {
        this.loginError = errorM;
      }
    );
    
  }

  onSwitch(displayMode): void {
    this.mode = displayMode;
  }

  getToken(): any {
    this.route.params
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(param => {
        if (param && param.token) {
          this.token = param.token;
          this.mode = DisplayMode.Reset;
        }
      });
  }
}
