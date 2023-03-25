import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UploadService } from '../../services/uploads/upload.service';
import * as assetAction from '../actions/asset.action';
import { AssetsService } from '../../services/assets/assets.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';

@Injectable()
export class AssetEffects {

    constructor(
        private actions$: Actions,
        private uploadApi: UploadService,
        private service: AssetsService,
        private router: Router,
        private store: Store,
        private snackbarService: SnackbarService
    ) { }

    /** UPLOAD */
    uploadRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType(assetAction.uploadRequested),
            switchMap(({ input }) =>
                this.uploadApi.upload(input).pipe(
                    map((response) => {
                        if (response.body && response.body.success) {
                            return assetAction.uploadFinished();
                        } else {
                            return assetAction.uploadProcessing({ uploadState: response });
                        }
                    }),
                    catchError((error) => {
                        return of(assetAction.uploadFailed({ errorMessage: error }));
                    })
                )
            )
        )
    );


    /* CRUD */
    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(assetAction.assetLoadRequested),
            switchMap(() => {
                return this.service.getAll().pipe(
                    map((response) => {
                        return assetAction.assetLoaded({ entries: response.data })
                    }),
                    catchError((error) =>
                        of(assetAction.assetLoadFailed({ errorMessage: error }))
                    )
                )
            }
            )
        )
    );

    saveRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType(assetAction.assetSaveRequested),
            switchMap(({ input }) =>
                this.service.createAsset(input).pipe(
                    map((response) => {
                        this.snackbarService.openSnackBarAlert('success', 'Asset added successfuly');
                        return assetAction.assetSaved({ entry: response.data });
                    }),
                    catchError((error) => {
                        this.snackbarService.openSnackBarAlert('error', error ? error : 'Server error');
                        return of(assetAction.assetSaveFailed({ errorMessage: error ? error : 'Server error' }));
                    }
                    )
                )
            )
        )
    );

    deleteRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType(assetAction.assetDeleteRequested),
            switchMap(({ entry }) =>
                this.service.delete(entry._id).pipe(
                    map((response) => {
                        this.snackbarService.openSnackBarAlert('success', 'Asset deleted successfuly');
                        return assetAction.assetDeleted({ entry });
                    }),
                    catchError((error) => {
                        this.snackbarService.openSnackBarAlert('error', error ? error : 'Server error');
                        return of(assetAction.assetDeleteFailed({
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
            ofType(assetAction.assetUpdateRequested),
            switchMap(({ param, body }) =>
                this.service.update(param, body).pipe(
                    map((response) => {
                        this.snackbarService.openSnackBarAlert('success', 'Asset updated successfuly');
                        return assetAction.assetUpdated({ entry: response.data });
                    }),
                    catchError((error) => {
                        this.snackbarService.openSnackBarAlert('error', error ? error : 'Server error');
                        return of(assetAction.assetUpdateFailed({
                            errorMessage: error ? error : 'Server error'
                        }));
                    }
                    )
                )
            )
        )
    );
}
