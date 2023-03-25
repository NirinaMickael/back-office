import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StatusState } from '../../schemas/status.schema';
import * as fromStatus  from "../reducers/status.reducer"
export const getRouteState = createFeatureSelector<StatusState>('status');

export const selectStatusState = createSelector(
    getRouteState,
    (state) => state
);
export const selectAllStatuss= createSelector(
    selectStatusState,
    fromStatus.selectAll
);
export const selectStatusLoading = createSelector(
    selectStatusState,
    (state) => state?.loading
);
export const selectStatusSaving = createSelector(
    selectStatusState,
    ({ saving }) => saving
);

export const selectStatusErrorMessage = createSelector(
    selectStatusState,
    (state) => state?.errorMessage
);

export const selectStatus = createSelector(
    selectStatusState,
    (state) => state?.status
);

export const selectStatusId = createSelector(
    selectStatusState,
    (state) => state
);

export const selectStatusLibelle = createSelector(
    selectStatus,
    (state) => {
        const name = state.libelle
        const id = state?._id;
        return {id, name}
    }
);
