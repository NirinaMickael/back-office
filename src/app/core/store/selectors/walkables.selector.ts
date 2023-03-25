import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WalkableState } from '../../schemas/walkable.schema';
import * as fromOeuvre  from "../reducers/walkables.reducers"
export const getRouteState = createFeatureSelector<WalkableState>('walkable');

export const selectWalkableState = createSelector(
    getRouteState,
    (state) => state
);
export const selectAllWalkable= createSelector(
    selectWalkableState,
    fromOeuvre.selectAll
);
export const selectWalkableLoading = createSelector(
    selectWalkableState,
    (state) => state?.loading
);
export const selectWalkableSaving = createSelector(
    selectWalkableState,
    ({ saving }) => saving
);

export const selectWalkableErrorMessage = createSelector(
    selectWalkableState,
    (state) => state?.errorMessage
);

export const selectWalkable = createSelector(
    selectWalkableState,
    (state) => state?.walkable
);

export const selectWalkableId = createSelector(
    selectWalkableState,
    (state) => state
);

export const selectWalkableName = createSelector(
    selectWalkable,
    (state) => {
        const name = state?.objectName
        const id = state?._id;
        return {id, name}
    }
);
