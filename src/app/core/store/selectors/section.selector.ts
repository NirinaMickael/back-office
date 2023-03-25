import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SectionState } from '../../schemas/section.schema';
import * as fromSection from '../reducers/section.reducer';

export const getRouteState = createFeatureSelector<SectionState>('sections');

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

export const selectSectionState = createSelector(
    getRouteState,
    (state) => state
);

export const selectAllSections = createSelector(
    selectSectionState,
    fromSection.selectAll
);

export const selectSectionLoading = createSelector(
    selectSectionState,
    ({ loading }) => loading
);

export const selectSectionSaving = createSelector(
    selectSectionState,
    ({ saving }) => saving
);

export const selectSectionError = createSelector(
    selectSectionState,
    ({ errorMessage }) => errorMessage
);

export const selectSectionById = (id) => createSelector(
    selectAllSections,
    (sections) => {
        if (sections instanceof Array) {
            return sections.find(e => e._id === id)
        } else return undefined;
    }
);
