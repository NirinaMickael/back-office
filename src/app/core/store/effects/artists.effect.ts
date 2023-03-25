import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as artistAction from '../actions/artists.action';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { ArtistService } from '../../services/artist/artist.service';

@Injectable()
export class ArtistEffects {

    constructor(
        private actions$: Actions, 
        private artistService: ArtistService, 
        private router: Router, 
        private store: Store,
        private snackbarService: SnackbarService
    ) { }

    loadArtists$ = createEffect(() =>
        this.actions$.pipe(
            ofType(artistAction.artistLoadRequested),
            switchMap(() => {
                return this.artistService.getAll().pipe(
                    map((response) => {
                        return artistAction.artistLoaded({ entries: response.data })
                    }),
                    catchError((error) =>
                        of(artistAction.artistLoadFailed({ errorMessage: error }))
                    )
                )
            }
            )
        )
    );

    saveRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType(artistAction.artistSaveRequested),
            switchMap(({ input }) =>
                this.artistService.createArtist(input).pipe(
                    map((response) => {
                        this.snackbarService.openSnackBarAlert('success', 'User added successfuly');
                        return artistAction.artistSaved({ entry: response.data });
                    }),
                    catchError((error) => {
                        this.snackbarService.openSnackBarAlert('error', error ? error : 'Server error');
                        return of(artistAction.artistSaveFailed({ errorMessage: error ? error : 'Server error' }));
                    }
                    )
                )
            )
        )
    );

    deleteRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType(artistAction.artistDeleteRequested),
            switchMap(({ entry }) =>
                this.artistService.delete(entry._id).pipe(
                    map((response) => {
                        console.log(response);
                        this.snackbarService.openSnackBarAlert('success', 'User deleted successfuly');
                        return artistAction.artistDeleted({ entry });
                    }),
                    catchError((error) => {
                        this.snackbarService.openSnackBarAlert('error', error?.error?.message ? error?.error?.message : 'Server error');
                        return of(artistAction.artistDeleteFailed({
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
            ofType(artistAction.artistUpdateRequested),
            switchMap(({ param, body }) =>
                this.artistService.update(param, body).pipe(
                    map((response) => {
                        this.snackbarService.openSnackBarAlert('success', 'User updated successfuly');
                        return artistAction.artistUpdated({ entry: response.data });
                    }),
                    catchError((error) => {
                        this.snackbarService.openSnackBarAlert('error', error ? error : 'Server error');
                        return of(artistAction.artistUpdateFailed({
                            errorMessage: error ? error : 'Server error'
                        }));
                    }
                    )
                )
            )
        )
    );

}
