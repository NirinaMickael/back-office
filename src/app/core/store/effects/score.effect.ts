import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ScoreService } from '../../services/score/score.service';
import * as scoreAction from '../actions/score.action';

@Injectable()
export class ScoreEffects {

    constructor(private actions$: Actions, private scoreApi: ScoreService, private router: Router, private store: Store) { }

    scoreRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType(scoreAction.scoreLoadRequested),
            switchMap(() =>
                this.scoreApi.getAllScore().pipe(
                    map((response) => {
                        return scoreAction.scoreLoaded({ 'entries': response.data })
                    }),
                    catchError((error) => {
                        return of(scoreAction.scoreLoadFailed({ errorMessage: error }));
                    })
                )
            )
        )
    );

}