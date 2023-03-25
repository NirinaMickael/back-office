import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OeuvreState } from '../../schemas/oeuvre.schema';
import * as fromOeuvre  from "../reducers/oeuvres.reducer"
export const getRouteState = createFeatureSelector<OeuvreState>('oeuvre');

export const selectOeuvreState = createSelector(
    getRouteState,
    (state) => state
);
export const selectAllOeuvres= createSelector(
    selectOeuvreState,
    fromOeuvre.selectAll
);
export const selectOeuvreLoading = createSelector(
    selectOeuvreState,
    (state) => state?.loading
);
export const selectOeuvreSaving = createSelector(
    selectOeuvreState,
    ({ saving }) => saving
);

export const selectOeuvreErrorMessage = createSelector(
    selectOeuvreState,
    (state) => state?.errorMessage
);

export const selectOeuvre = createSelector(
    selectOeuvreState,
    (state) => state?.oeuvre
);

export const selectOeuvreId = createSelector(
    selectOeuvreState,
    (state) => state
);

export const selectOeuvreName = createSelector(
    selectOeuvre,
    (state) => {
        const name = state?.name
        const id = state?._id;
        return {id, name}
    }
);
