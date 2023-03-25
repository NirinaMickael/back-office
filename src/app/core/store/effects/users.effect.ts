import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UsersService } from '../../services/users/users.service';
import * as userAction from '../actions/users.action';
import { userLoadRequested } from '../actions/users.action';
import { SnackbarService } from '../../services/snackbar/snackbar.service';

@Injectable()
export class UserEffects {

    constructor(
        private actions$: Actions, 
        private userService: UsersService, 
        private router: Router, 
        private store: Store,
        private snackbarService: SnackbarService
    ) { }

    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(userAction.userLoadRequested),
            switchMap(() => {
                return this.userService.getAll().pipe(
                    map((response) => {
                        return userAction.userLoaded({ entries: response.data })
                    }),
                    catchError((error) =>
                        of(userAction.userLoadFailed({ errorMessage: error }))
                    )
                )
            }
            )
        )
    );

    saveRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType(userAction.userSaveRequested),
            switchMap(({ input }) =>
                this.userService.createUser(input).pipe(
                    map((response) => {
                        this.snackbarService.openSnackBarAlert('success', 'User added successfuly');
                        return userAction.userSaved({ entry: response.data });
                    }),
                    catchError((error) => {
                        this.snackbarService.openSnackBarAlert('error', error ? error : 'Server error');
                        return of(userAction.userSaveFailed({ errorMessage: error ? error : 'Server error' }));
                    }
                    )
                )
            )
        )
    );

    deleteRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType(userAction.userDeleteRequested),
            switchMap(({ entry }) =>
                this.userService.delete(entry._id).pipe(
                    map((response) => {
                        this.snackbarService.openSnackBarAlert('success', 'User deleted successfuly');
                        return userAction.userDeleted({ entry });
                    }),
                    catchError((error) => {
                        this.snackbarService.openSnackBarAlert('error', error?.error?.message ? error?.error?.message : 'Server error');
                        return of(userAction.userDeleteFailed({
                            errorMessage: error ? error : 'server error'
                        }));
                    }
                    )
                )
            )
        )
    );

    updateRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType(userAction.userUpdateRequested),
            switchMap(({ param, body }) =>
                this.userService.update(param, body).pipe(
                    map((response) => {
                        this.snackbarService.openSnackBarAlert('success', 'User updated successfuly');
                        return userAction.userUpdated({ entry: response.data });
                    }),
                    catchError((error) => {
                        this.snackbarService.openSnackBarAlert('error', error ? error : 'Server error');
                        return of(userAction.userUpdateFailed({
                            errorMessage: error ? error : 'Server error'
                        }));
                    }
                    )
                )
            )
        )
    );

}
