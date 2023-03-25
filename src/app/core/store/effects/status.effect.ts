import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as statusAction from '../actions/status.action';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { StatusService } from '../../services/status/status.service';

@Injectable()
export class StatusEffects {

    constructor(
        private actions$: Actions, 
        private statusService: StatusService, 
        private router: Router, 
        private store: Store,
        private snackbarService: SnackbarService
    ) { }

    loadStatuss$ = createEffect(() =>
        this.actions$.pipe(
            ofType(statusAction.statusLoadRequested),
            switchMap(() => {
                return this.statusService.getAll().pipe(
                    map((response) => {
                        return statusAction.statusLoaded({ entries: response.data })
                    }),
                    catchError((error) =>
                        of(statusAction.statusLoadFailed({ errorMessage: error }))
                    )
                )
            }
            )
        )
    );

    saveRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType(statusAction.statusSaveRequested),
            switchMap(({ input }) =>
                this.statusService.createStatus(input).pipe(
                    map((response) => {
                        this.snackbarService.openSnackBarAlert('success', 'Status added successfuly');
                        return statusAction.statusSaved({ entry: response.data });
                    }),
                    catchError((error) => {
                        this.snackbarService.openSnackBarAlert('error', error ? error : 'Server error');
                        return of(statusAction.statusSaveFailed({ errorMessage: error ? error : 'Server error' }));
                    }
                    )
                )
            )
        )
    );

    deleteRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType(statusAction.statusDeleteRequested),
            switchMap(({ entry }) =>
                this.statusService.delete(entry._id).pipe(
                    map((response) => {
                        console.log(response);
                        this.snackbarService.openSnackBarAlert('success', 'Status deleted successfuly');
                        return statusAction.statusDeleted({ entry });
                    }),
                    catchError((error) => {
                        this.snackbarService.openSnackBarAlert('error', error?.error?.message ? error?.error?.message : 'Server error');
                        return of(statusAction.statusDeleteFailed({
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
            ofType(statusAction.statusUpdateRequested),
            switchMap(({ param, body }) =>
                this.statusService.update(param, body).pipe(
                    map((response) => {
                        this.snackbarService.openSnackBarAlert('success', 'Status updated successfuly');
                        return statusAction.statusUpdated({ entry: response.data });
                    }),
                    catchError((error) => {
                        this.snackbarService.openSnackBarAlert('error', error ? error : 'Server error');
                        return of(statusAction.statusUpdateFailed({
                            errorMessage: error ? error : 'Server error'
                        }));
                    }
                    )
                )
            )
        )
    );

}
