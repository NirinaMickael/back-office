import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as oeuvreAction from '../actions/oeuvres.action';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { OeuvreService } from '../../services/oeuvres/oeuvres.service';

@Injectable()
export class OeuvreEffects {

    constructor(
        private actions$: Actions, 
        private oeuvreService: OeuvreService, 
        private router: Router, 
        private store: Store,
        private snackbarService: SnackbarService
    ) { }

    loadOeuvres$ = createEffect(() =>
        this.actions$.pipe(
            ofType(oeuvreAction.oeuvreLoadRequested),
            switchMap(() => {
                return this.oeuvreService.getAll().pipe(
                    map((response) => {
                        return oeuvreAction.oeuvreLoaded({ entries: response.data })
                    }),
                    catchError((error) =>
                        of(oeuvreAction.oeuvreLoadFailed({ errorMessage: error }))
                    )
                )
            }
            )
        )
    );

    saveRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType(oeuvreAction.oeuvreSaveRequested),
            switchMap(({ input }) =>
                this.oeuvreService.createOeuvre(input).pipe(
                    map((response) => {
                        this.snackbarService.openSnackBarAlert('success', 'User added successfuly');
                        return oeuvreAction.oeuvreSaved({ entry: response.data });
                    }),
                    catchError((error) => {
                        this.snackbarService.openSnackBarAlert('error', error ? error : 'Server error');
                        return of(oeuvreAction.oeuvreSaveFailed({ errorMessage: error ? error : 'Server error' }));
                    }
                    )
                )
            )
        )
    );

    deleteRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType(oeuvreAction.oeuvreDeleteRequested),
            switchMap(({ entry }) =>
                this.oeuvreService.delete(entry._id).pipe(
                    map((response) => {
                        this.snackbarService.openSnackBarAlert('success', 'User deleted successfuly');
                        return oeuvreAction.oeuvreDeleted({ entry });
                    }),
                    catchError((error) => {
                        this.snackbarService.openSnackBarAlert('error', error?.error?.message ? error?.error?.message : 'Server error');
                        return of(oeuvreAction.oeuvreDeleteFailed({
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
            ofType(oeuvreAction.oeuvreUpdateRequested),
            switchMap(({ param, body }) =>
                this.oeuvreService.update(param, body).pipe(
                    map((response) => {
                        this.snackbarService.openSnackBarAlert('success', 'User updated successfuly');
                        return oeuvreAction.oeuvreUpdated({ entry: response.data });
                    }),
                    catchError((error) => {
                        this.snackbarService.openSnackBarAlert('error', error ? error : 'Server error');
                        return of(oeuvreAction.oeuvreUpdateFailed({
                            errorMessage: error ? error : 'Server error'
                        }));
                    }
                    )
                )
            )
        )
    );

}
