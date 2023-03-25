import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LogService } from '../../services/log/log.service';
import * as logAction from '../actions/log.action';

@Injectable()
export class LogEffects {

    constructor(private actions$: Actions, private logApi: LogService, private router: Router, private store: Store) { }

    logRequested$ = createEffect(() => 
        this.actions$.pipe(
            ofType(logAction.logLoadRequested),
            switchMap(() =>
                this.logApi.getAll().pipe(
                    map((response) => {
                        return logAction.logLoaded({'entries': response.data})
                    }),
                    catchError((error) => {
                        return of(logAction.logLoadFailed({errorMessage: error}));
                    })
                )
            )
        )
    );

}
