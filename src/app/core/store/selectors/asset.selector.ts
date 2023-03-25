import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AssetState } from '../../schemas/asset.schema';
import * as fromAsset from '../reducers/asset.reducer';

export const getRouteState = createFeatureSelector<AssetState>('assets');

export const selectAssetState = createSelector(
    getRouteState,
    (state) => state
);

export const selectAllAssets = createSelector(
    selectAssetState,
    fromAsset.selectAll
);

export const selectAssetLoading = createSelector(
    selectAssetState,
    ({ loading }) => loading
);

export const selectAssetSaving = createSelector(
    selectAssetState,
    ({ saving }) => saving
);

export const selectAssetError = createSelector(
    selectAssetState,
    ({ errorMessage }) => errorMessage
);

export const selectAssetUploadState = createSelector(
    selectAssetState,
    ({ uploadState }) => uploadState
);

export const selectAssetById = (id) => createSelector(
    selectAllAssets,
    (assets) => {
        if (assets instanceof Array) {
            return assets.find(e => e._id === id)
        } else return undefined;
    }
);