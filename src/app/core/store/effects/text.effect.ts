import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UploadService } from '../../services/uploads/upload.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { TextManagerService } from '../../services/text-manager/text-manager.service';
import * as textAction from '../actions/texts.action';

@Injectable()
export class TextEffects {

    constructor(
        private actions$: Actions,
        private uploadApi: UploadService,
        private service: TextManagerService,
        private router: Router,
        private store: Store,
        private snackbarService: SnackbarService
    ) { }

    /* CRUD */
    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(textAction.textLoadRequested),
            switchMap(() => {
                return this.service.getAll().pipe(
                    map((response) => {
                        return textAction.textLoaded({ entries: response.data })
                    }),
                    catchError((error) =>
                        of(textAction.textLoadFailed({ errorMessage: error }))
                    )
                )
            }
            )
        )
    );

    saveRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType(textAction.textSaveRequested),
            switchMap(({ input }) =>
                this.service.create(input).pipe(
                    map((response) => {
                        this.snackbarService.openSnackBarAlert('success', 'Item added successfuly');
                        return textAction.textSaved({ entry: response.data });
                    }),
                    catchError((error) => {
                        this.snackbarService.openSnackBarAlert('error', error ? error : 'Server error');
                        return of(textAction.textSaveFailed({ errorMessage: error ? error : 'Server error' }));
                    }
                    )
                )
            )
        )
    );

    deleteRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType(textAction.textDeleteRequested),
            switchMap(({ entry }) =>
                this.service.delete(entry._id).pipe(
                    map((response) => {
                        this.snackbarService.openSnackBarAlert('success', 'Item deleted successfuly');
                        return textAction.textDeleted({ entry });
                    }),
                    catchError((error) => {
                        this.snackbarService.openSnackBarAlert('error', error ? error : 'Server error');
                        return of(textAction.textDeleteFailed({
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
            ofType(textAction.textUpdateRequested),
            switchMap(({ param, body }) =>
                this.service.update(param, body).pipe(
                    map((response) => {
                        this.snackbarService.openSnackBarAlert('success', 'Item updated successfuly');
                        return textAction.textUpdated({ entry: response.data });
                    }),
                    catchError((error) => {
                        this.snackbarService.openSnackBarAlert('error', error ? error : 'Server error');
                        return of(textAction.textUpdateFailed({
                            errorMessage: error ? error : 'Server error'
                        }));
                    }
                    )
                )
            )
        )
    );
}
