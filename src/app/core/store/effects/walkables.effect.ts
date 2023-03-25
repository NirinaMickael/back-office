import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as walkableAction from '../actions/walkable.action';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { WalkablesService } from '../../services/walkables/walkables.service';
// import { walkableService } from '../../services/walkables/walkables.service';

@Injectable()
export class WalkableEffects {

    constructor(
        private actions$: Actions, 
        private walkableService: WalkablesService, 
        private router: Router, 
        private store: Store,
        private snackbarService: SnackbarService
    ) { }

    loadwalkables$ = createEffect(() =>
        this.actions$.pipe(
            ofType(walkableAction.walkableLoadRequested),
            switchMap(() => {
                return this.walkableService.getAll().pipe(
                    map((response) => {
                        return walkableAction.walkableLoaded({ entries: response.data })
                    }),
                    catchError((error) =>
                        of(walkableAction.walkableLoadFailed({ errorMessage: error }))
                    )
                )
            }
            )
        )
    );

    saveRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType(walkableAction.walkableSaveRequested),
            switchMap(({ input }) =>
                this.walkableService.createWalkable(input).pipe(
                    map((response) => {
                        this.snackbarService.openSnackBarAlert('success', 'User added successfuly');
                        return walkableAction.walkableSaved({ entry: response.data });
                    }),
                    catchError((error) => {
                        this.snackbarService.openSnackBarAlert('error', error ? error : 'Server error');
                        return of(walkableAction.walkableSaveFailed({ errorMessage: error ? error : 'Server error' }));
                    }
                    )
                )
            )
        )
    );

    deleteRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType(walkableAction.walkableDeleteRequested),
            switchMap(({ entry }) =>
                this.walkableService.delete(entry._id).pipe(
                    map((response) => {
                        this.snackbarService.openSnackBarAlert('success', 'User deleted successfuly');
                        return walkableAction.walkableDeleted({ entry });
                    }),
                    catchError((error) => {
                        this.snackbarService.openSnackBarAlert('error', error?.error?.message ? error?.error?.message : 'Server error');
                        return of(walkableAction.walkableDeleteFailed({
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
            ofType(walkableAction.walkableUpdateRequested),
            switchMap(({ param, body }) =>
                this.walkableService.update(param, body).pipe(
                    map((response) => {
                        this.snackbarService.openSnackBarAlert('success', 'User updated successfuly');
                        return walkableAction.walkableUpdated({ entry: response.data });
                    }),
                    catchError((error) => {
                        this.snackbarService.openSnackBarAlert('error', error ? error : 'Server error');
                        return of(walkableAction.walkableUpdateFailed({
                            errorMessage: error ? error : 'Server error'
                        }));
                    }
                    )
                )
            )
        )
    );

}
