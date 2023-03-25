import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TextState } from '../../schemas/text.schema';
import * as fromText from '../reducers/texts.reducer';

export const getRouteState = createFeatureSelector<TextState>('texts');

export const selectAccountState = createSelector(
    getRouteState,
    (state) => state
);

export const selectAccountLoading = createSelector(
    selectAccountState,
    (state) => state?.loading
);

export const selectAccountErrorMessage = createSelector(
    selectAccountState,
    (state) => state?.errorMessage
);

export const selectTextState = createSelector(
    getRouteState,
    (state) => state
);

export const selectAllTexts = createSelector(
    selectTextState,
    fromText.selectAll
);

export const selectTextLoading = createSelector(
    selectTextState,
    ({ loading }) => loading
);

export const selectTextSaving = createSelector(
    selectTextState,
    ({ saving }) => saving
);

export const selectTextError = createSelector(
    selectTextState,
    ({ errorMessage }) => errorMessage
);

export const selectTextById = (id) => createSelector(
    selectAllTexts,
    (texts) => {
        if (texts instanceof Array) {
            return texts.find(e => e._id === id)
        } else return undefined;
    }
);
