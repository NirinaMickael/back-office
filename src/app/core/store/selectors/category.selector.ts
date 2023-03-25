import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CategoryState } from '../../schemas/caterogy.schema';
import * as fromCategory from "../reducers/category.reducer"
export const getRouteState = createFeatureSelector<CategoryState>('category');

export const selectCategoryState = createSelector(
    getRouteState,
    (state) => state
);
export const selectCategoryLoading = createSelector(
    selectCategoryState,
    (state) => state?.loading
);
export const selectAllCategory= createSelector(
    selectCategoryState,
    fromCategory.selectAll
);
export const selectCategorySaving = createSelector(
    selectCategoryState,
    ({ saving }) => saving
);

export const selectCategoryErrorMessage = createSelector(
    selectCategoryState,
    (state) => state?.errorMessage
);

export const selectCategory = createSelector(
    selectCategoryState,
    (state) => state?.category
);

export const selectCategoryId = createSelector(
    selectCategoryState,
    (state) => state
);

export const selectCategoryName = createSelector(
    selectCategory,
    (state) => {
        const name = state?.name
        const id = state?._id;
        return {id, name}
    }
);
