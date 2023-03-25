import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UploadService } from '../../services/uploads/upload.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { SliderManagerService } from '../../services/slider-manager/slider-manager.service';
import * as sliderAction from '../actions/sliders.action';

@Injectable()
export class SliderEffects {

    constructor(
        private actions$: Actions,
        private uploadApi: UploadService,
        private service: SliderManagerService,
        private router: Router,
        private store: Store,
        private snackbarService: SnackbarService
    ) { }

    /* CRUD */
    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(sliderAction.sliderLoadRequested),
            switchMap(() => {
                return this.service.getAll().pipe(
                    map((response) => {
                        return sliderAction.sliderLoaded({ entries: response.data })
                    }),
                    catchError((error) =>
                        of(sliderAction.sliderLoadFailed({ errorMessage: error }))
                    )
                )
            }
            )
        )
    );

    saveRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType(sliderAction.sliderSaveRequested),
            switchMap(({ input }) =>
                this.service.create(input).pipe(
                    map((response) => {
                        this.snackbarService.openSnackBarAlert('success', 'Item added successfuly');
                        return sliderAction.sliderSaved({ entry: response.data });
                    }),
                    catchError((error) => {
                        this.snackbarService.openSnackBarAlert('error', error ? error : 'Server error');
                        return of(sliderAction.sliderSaveFailed({ errorMessage: error ? error : 'Server error' }));
                    }
                    )
                )
            )
        )
    );

    deleteRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType(sliderAction.sliderDeleteRequested),
            switchMap(({ entry }) =>
                this.service.delete(entry._id).pipe(
                    map((response) => {
                        this.snackbarService.openSnackBarAlert('success', 'Item deleted successfuly');
                        return sliderAction.sliderDeleted({ entry });
                    }),
                    catchError((error) => {
                        this.snackbarService.openSnackBarAlert('error', error ? error : 'Server error');
                        return of(sliderAction.sliderDeleteFailed({
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
            ofType(sliderAction.sliderUpdateRequested),
            switchMap(({ param, body }) =>
                this.service.update(param, body).pipe(
                    map((response) => {
                        this.snackbarService.openSnackBarAlert('success', 'Item updated successfuly');
                        return sliderAction.sliderUpdated({ entry: response.data });
                    }),
                    catchError((error) => {
                        this.snackbarService.openSnackBarAlert('error', error ? error : 'Server error');
                        return of(sliderAction.sliderUpdateFailed({
                            errorMessage: error ? error : 'Server error'
                        }));
                    }
                    )
                )
            )
        )
    );
}
