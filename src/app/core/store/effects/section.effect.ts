import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UploadService } from '../../services/uploads/upload.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { SectionManagerService } from '../../services/section-manager/section-manager.service';
import * as sectionAction from '../actions/sections.action';

@Injectable()
export class SectionEffects {

    constructor(
        private actions$: Actions,
        private uploadApi: UploadService,
        private service: SectionManagerService,
        private router: Router,
        private store: Store,
        private snackbarService: SnackbarService
    ) { }

    /* CRUD */
    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(sectionAction.sectionLoadRequested),
            switchMap(() => {
                return this.service.getAll().pipe(
                    map((response) => {
                        return sectionAction.sectionLoaded({ entries: response.data })
                    }),
                    catchError((error) =>
                        of(sectionAction.sectionLoadFailed({ errorMessage: error }))
                    )
                )
            }
            )
        )
    );

    saveRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType(sectionAction.sectionSaveRequested),
            switchMap(({ input }) =>
                this.service.create(input).pipe(
                    map((response) => {
                        this.snackbarService.openSnackBarAlert('success', 'Item added successfuly');
                        return sectionAction.sectionSaved({ entry: response.data });
                    }),
                    catchError((error) => {
                        this.snackbarService.openSnackBarAlert('error', error ? error : 'Server error');
                        return of(sectionAction.sectionSaveFailed({ errorMessage: error ? error : 'Server error' }));
                    }
                    )
                )
            )
        )
    );

    deleteRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType(sectionAction.sectionDeleteRequested),
            switchMap(({ entry }) =>
                this.service.delete(entry._id).pipe(
                    map((response) => {
                        this.snackbarService.openSnackBarAlert('success', 'Item deleted successfuly');
                        return sectionAction.sectionDeleted({ entry });
                    }),
                    catchError((error) => {
                        this.snackbarService.openSnackBarAlert('error', error ? error : 'Server error');
                        return of(sectionAction.sectionDeleteFailed({
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
            ofType(sectionAction.sectionUpdateRequested),
            switchMap(({ param, body }) =>
                this.service.update(param, body).pipe(
                    map((response) => {
                        this.snackbarService.openSnackBarAlert('success', 'Item updated successfuly');
                        return sectionAction.sectionUpdated({ entry: response.data });
                    }),
                    catchError((error) => {
                        this.snackbarService.openSnackBarAlert('error', error ? error : 'Server error');
                        return of(sectionAction.sectionUpdateFailed({
                            errorMessage: error ? error : 'Server error'
                        }));
                    }
                    )
                )
            )
        )
    );
}
