import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as categoryAction from '../actions/category.action';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { CategoryService } from "../../services/category/category.service";

@Injectable()
export class CategoryEffects {

    constructor(
        private actions$: Actions, 
        private categoryService: CategoryService, 
        private router: Router, 
        private store: Store,
        private snackbarService: SnackbarService
    ) { }

    loadCategorys$ = createEffect(() =>
        this.actions$.pipe(
            ofType(categoryAction.categoryLoadRequested),
            switchMap(() => {
                console.log("jhdc");
                return this.categoryService.getAll().pipe(
                    map((response) => {
                        return categoryAction.categoryLoaded({ entries: response.data })
                    }),
                    catchError((error) =>
                        of(categoryAction.categoryLoadFailed({ errorMessage: error }))
                    )
                )
            }
            )
        )
    );

    saveRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType(categoryAction.categorySaveRequested),
            switchMap(({ input }) =>
                this.categoryService.createCategory(input).pipe(
                    map((response) => {
                        this.snackbarService.openSnackBarAlert('success', 'User added successfuly');
                        return categoryAction.categorySaved({ entry: response.data });
                    }),
                    catchError((error) => {
                        this.snackbarService.openSnackBarAlert('error', error ? error : 'Server error');
                        return of(categoryAction.categorySaveFailed({ errorMessage: error ? error : 'Server error' }));
                    }
                    )
                )
            )
        )
    );

    deleteRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType(categoryAction.categoryDeleteRequested),
            switchMap(({ entry }) =>
                this.categoryService.delete(entry._id).pipe(
                    map((response) => {
                        console.log(response);
                        this.snackbarService.openSnackBarAlert('success', 'User deleted successfuly');
                        return categoryAction.categoryDeleted({ entry });
                    }),
                    catchError((error) => {
                        this.snackbarService.openSnackBarAlert('error', error?.error?.message ? error?.error?.message : 'Server error');
                        return of(categoryAction.categoryDeleteFailed({
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
            ofType(categoryAction.categoryUpdateRequested),
            switchMap(({ param, body }) =>
                this.categoryService.update(param, body).pipe(
                    map((response) => {
                        this.snackbarService.openSnackBarAlert('success', 'User updated successfuly');
                        return categoryAction.categoryUpdated({ entry: response.data });
                    }),
                    catchError((error) => {
                        this.snackbarService.openSnackBarAlert('error', error ? error : 'Server error');
                        return of(categoryAction.categoryUpdateFailed({
                            errorMessage: error ? error : 'Server error'
                        }));
                    }
                    )
                )
            )
        )
    );

}
