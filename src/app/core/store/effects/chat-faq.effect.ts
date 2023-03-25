import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ChatFaqService } from '../../services/chat-faq/chat-faq.service';
import * as chatFaqActions from '../actions/chat-faq.action';
import { SnackbarService } from '../../services/snackbar/snackbar.service';

@Injectable()
export class ChatFaqEffects {

    constructor(
        private actions$: Actions,
        private chatFaqService: ChatFaqService,
        private router: Router,
        private store: Store,
        private snackbarService: SnackbarService
    ) { }

    loadChatFaqs$ = createEffect(() =>
        this.actions$.pipe(
            ofType(chatFaqActions.chatFaqLoadRequested),
            switchMap(() => {
                return this.chatFaqService.getAll().pipe(
                    map((response) => {
                        return chatFaqActions.chatFaqLoaded({ entries: response.data })
                    }),
                    catchError((error) =>
                        of(chatFaqActions.chatFaqLoadFailed({ errorMessage: error }))
                    )
                )
            }
            )
        )
    );

    saveRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType(chatFaqActions.chatFaqSaveRequested),
            switchMap(({ input }) =>
                this.chatFaqService.create(input).pipe(
                    map((response) => {
                        this.snackbarService.openSnackBarAlert('success', 'Chat Faq added successfuly');
                        return chatFaqActions.chatFaqSaved({ entry: response.data });
                    }),
                    catchError((error) => {
                      console.log("error=>", error)
                        this.snackbarService.openSnackBarAlert('error', error ? error : 'Server error');
                        return of(chatFaqActions.chatFaqSaveFailed({ errorMessage: error ? error : 'Server error' }));
                    }
                    )
                )
            )
        )
    );

    deleteRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType(chatFaqActions.chatFaqDeleteRequested),
            switchMap(({ entry }) =>
                this.chatFaqService.delete(entry._id).pipe(
                    map((response) => {
                        this.snackbarService.openSnackBarAlert('success', 'Chat Faq deleted successfuly');
                        return chatFaqActions.chatFaqDeleted({ entry });
                    }),
                    catchError((error) => {
                        this.snackbarService.openSnackBarAlert('error', error?.error?.message ? error?.error?.message : 'Server error');
                        return of(chatFaqActions.chatFaqDeleteFailed({
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
            ofType(chatFaqActions.chatFaqUpdateRequested),
            switchMap(({ param, body }) =>
                this.chatFaqService.update(param, body).pipe(
                    map((response) => {
                        this.snackbarService.openSnackBarAlert('success', 'Chat Faq updated successfuly');
                        return chatFaqActions.chatFaqUpdated({ entry: response.data });
                    }),
                    catchError((error) => {
                        this.snackbarService.openSnackBarAlert('error', error ? error : 'Server error');
                        return of(chatFaqActions.chatFaqUpdateFailed({
                            errorMessage: error ? error : 'Server error'
                        }));
                    }
                    )
                )
            )
        )
    );

}
