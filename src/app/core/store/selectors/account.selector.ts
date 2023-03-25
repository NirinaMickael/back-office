import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../../schemas/users.schema';

export const getRouteState = createFeatureSelector<UserState>('account');

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

export const selectAccount = createSelector(
    selectAccountState,
    (state) => state?.account
);

export const selectAccountId = createSelector(
    selectAccountState,
    (state) => state?.account._id
);

export const selectAccountName = createSelector(
    selectAccount,
    (state) => {
        const name = state?.name || state?.email
        const id = state?._id;
        return {id, name}
    }
);
