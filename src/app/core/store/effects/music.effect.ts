import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UploadService } from '../../services/uploads/upload.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { MusicService } from '../../services/game-music/game-music.service';
import * as MusicAction from '../actions/music.action';

@Injectable()
export class MusicEffects {

    constructor(
        private actions$: Actions,
        private uploadApi: UploadService,
        private service: MusicService,
        private router: Router,
        private store: Store,
        private snackbarService: SnackbarService
    ) { }

    /* CRUD */
    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MusicAction.MusicLoadRequested),
            switchMap(() => {
                return this.service.getAll().pipe(
                    map((response) => {
                        return MusicAction.MusicLoaded({ entries: response.data })
                    }),
                    catchError((error) =>
                        of(MusicAction.MusicLoadFailed({ errorMessage: error }))
                    )
                )
            }
            )
        )
    );

    saveRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MusicAction.MusicSaveRequested),
            switchMap(({ input }) =>
                this.service.create(input).pipe(
                    map((response) => {
                        this.snackbarService.openSnackBarAlert('success', 'Item added successfuly');
                        return MusicAction.MusicSaved({ entry: response.data });
                    }),
                    catchError((error) => {
                        this.snackbarService.openSnackBarAlert('error', error ? error : 'Server error');
                        return of(MusicAction.MusicSaveFailed({ errorMessage: error ? error : 'Server error' }));
                    }
                    )
                )
            )
        )
    );

    deleteRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MusicAction.MusicDeleteRequested),
            switchMap(({ entry }) =>
                this.service.delete(entry._id).pipe(
                    map((response) => {
                        this.snackbarService.openSnackBarAlert('success', 'Item deleted successfuly');
                        return MusicAction.MusicDeleted({ entry });
                    }),
                    catchError((error) => {
                        this.snackbarService.openSnackBarAlert('error', error ? error : 'Server error');
                        return of(MusicAction.MusicDeleteFailed({
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
            ofType(MusicAction.MusicUpdateRequested),
            switchMap(({ param, body }) =>
                this.service.update(param, body).pipe(
                    map((response) => {
                        this.snackbarService.openSnackBarAlert('success', 'Item updated successfuly');
                        return MusicAction.MusicUpdated({ entry: response.data });
                    }),
                    catchError((error) => {
                        this.snackbarService.openSnackBarAlert('error', error ? error : 'Server error');
                        return of(MusicAction.MusicUpdateFailed({
                            errorMessage: error ? error : 'Server error'
                        }));
                    }
                    )
                )
            )
        )
    );
}
