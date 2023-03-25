import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LogState } from '../../schemas/log.schema';
import * as fromLog from '../reducers/log.reducer';

export const getRouteState = createFeatureSelector<LogState>('logs');

export const selectLogState = createSelector(
    getRouteState,
    (state) => state
);

export const selectAllLogs = createSelector(
    selectLogState,
    fromLog.selectAll
);

export const selectLogLoading = createSelector(
    selectLogState,
    ({ loading }) => loading
);

export const selectLogSaving = createSelector(
    selectLogState,
    ({ saving }) => saving
);

export const selectLogError = createSelector(
    selectLogState,
    ({ errorMessage }) => errorMessage
);

export const selectLogById = (id) => createSelector(
    selectAllLogs,
    (logs) => {
        if (logs instanceof Array) {
            return logs.find(e => e._id === id)
        } else return undefined;
    }
);