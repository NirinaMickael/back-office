import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as AccountAction from '../actions/account.action';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { UsersService } from '../../services/users/users.service';
import { AuthService } from '../../services/auth/auth.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { PasswordService } from '../../services/compare/password.service';
import jwtDecode from 'jwt-decode';
@Injectable()
export class AccountEffects {

    constructor(
        private actions$: Actions,
        private authAPI: AuthService,
        private userAPI: UsersService,
        private router: Router,
        protected store: Store,
        private snackbar: SnackbarService,
        private pswdService: PasswordService
    ) {
    }

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AccountAction.accountLoginRequested),
            switchMap(({ input }) =>
                this.authAPI.login(input).pipe(
                    mergeMap((response) => {
                        if (response.body.role === 'visitor') throw new Error("You don't have the access required");
                        if (!response.body) throw new Error(response.message);
                        this.authAPI.storeTokens(response.token);
                        if (response.body.role === 'artist') {
                            this.router.navigate(['/oeuvres'])
                        } 
                        if (response.body.role === 'superAdmin' || response.body.role === 'admin') {
                            this.router.navigate(['/oeuvres'])
                        }
                        else {
                            this.router.navigate(['/']);
                        }
                        return [
                            AccountAction.accountLoginSuccess({ entry: response.body })
                        ];
                    }),
                    catchError((error) => {
                        return of(AccountAction.accountLoginFail({ errorMessage: error }));
                    })
                )
            )
        )
    );

    forgot$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AccountAction.forgotPasswordRequested),
            switchMap(({ input }) =>{
                return this.authAPI.forgotPassword(input).pipe(
                    map((response) => {
                        if (!response.success) {
                            throw new Error(response.message);
                        }
                        this.snackbar.openSnackBarAlert('success', 'Email sent');
                        return AccountAction.forgotPasswordSuccess();
                    }),
                    catchError((error) => {
                        return of(AccountAction.forgotPasswordFail({ errorMessage: error }));
                    })
                )
            })
        )
    );

    reset$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AccountAction.resetPasswordRequested),
            switchMap(({ param, body }) =>
                this.authAPI.resetPassword(param, body).pipe(
                    map((response) => {
                        if (!response.success) {
                            throw new Error(response.message);
                        }
                        this.snackbar.openSnackBarAlert('success', 'Password reset successfuly');
                        return AccountAction.resetPasswordSuccess();
                    }),
                    catchError((error) => {
                        return of(AccountAction.forgotPasswordFail({ errorMessage: error ? error : 'Server error' }));
                    })
                )
            )
        )
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AccountAction.accountLogoutRequested),
            switchMap(({ input }) => {
                return this.authAPI.logout(input).pipe(
                    map(() => {
                        this.authAPI.clearTokens();
                        this.router.navigate(['auth/signin']);
                        return AccountAction.accountLogoutSuccess();
                    }),
                    catchError((error) => {
                        return of(AccountAction.accountLogoutFail({ errorMessage: error }));
                    })
                )
            })
        )
    );

    getUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AccountAction.getUserRequested),
            switchMap(({ input }) =>
                this.userAPI.getOneById(input._id).pipe(
                    map((response) => {
                        if (!response.data) {
                            throw new Error(response.message);
                        }
                        return AccountAction.getUserSuccess({ entry: response.data });
                    }),
                    catchError((error) => {
                        localStorage.removeItem('access-token');
                        this.router.navigate(['/login']);
                        return of(AccountAction.getUserFail({ errorMessage: error }));
                    })
                )
            )
        )
    );

    newAccessToken$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AccountAction.getNewAccessTokenRequested),
            switchMap(() =>
                this.authAPI.getNewAccessToken().pipe(
                    mergeMap((response) => {
                        this.authAPI.storeTokens(response.accessToken);
                        return [
                            AccountAction.getNewAccessTokenSuccess()
                        ];
                    }),
                    catchError((error) => {
                        return of(AccountAction.getNewAccessTokenFail({ errorMessage: error }));
                    })
                )
            )
        )
    );

    comparePassword$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AccountAction.getComparePasswordRequested),
            switchMap(({input}) =>
                this.pswdService.comparePassword(input).pipe(
                    map((response) => {
                        return AccountAction.getComparePasswordSuccess({ 'entry': response.data})
                    }),
                    catchError((error) => {
                        return of (AccountAction.getComparePasswordFail({errorMessage: error}));
                    })
                )
            )
        )
    );
}
