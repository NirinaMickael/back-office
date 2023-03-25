import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SliderState } from '../../schemas/slider.schema';
import * as fromSlider from '../reducers/slider.reducer';

export const getRouteState = createFeatureSelector<SliderState>('sliders');

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

export const selectSliderState = createSelector(
    getRouteState,
    (state) => state
);

export const selectAllSliders = createSelector(
    selectSliderState,
    fromSlider.selectAll
);

export const selectSliderLoading = createSelector(
    selectSliderState,
    ({ loading }) => loading
);

export const selectSliderSaving = createSelector(
    selectSliderState,
    ({ saving }) => saving
);

export const selectSliderError = createSelector(
    selectSliderState,
    ({ errorMessage }) => errorMessage
);

export const selectSliderById = (id) => createSelector(
    selectAllSliders,
    (sliders) => {
        if (sliders instanceof Array) {
            return sliders.find(e => e._id === id)
        } else return undefined;
    }
);
