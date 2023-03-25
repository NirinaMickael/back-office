import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ArtistState } from '../../schemas/artists.schema';
import * as fromArtist  from "../reducers/artists.reducer"
export const getRouteState = createFeatureSelector<ArtistState>('artist');

export const selectArtistState = createSelector(
    getRouteState,
    (state) => state
);
export const selectAllArtists= createSelector(
    selectArtistState,
    fromArtist.selectAll
);
export const selectArtistLoading = createSelector(
    selectArtistState,
    (state) => state?.loading
);
export const selectArtistSaving = createSelector(
    selectArtistState,
    ({ saving }) => saving
);

export const selectArtistErrorMessage = createSelector(
    selectArtistState,
    (state) => state?.errorMessage
);

export const selectArtist = createSelector(
    selectArtistState,
    (state) => state?.artist
);

export const selectArtistId = createSelector(
    selectArtistState,
    (state) => state
);

export const selectArtistName = createSelector(
    selectArtist,
    (state) => {
        const name = state?.artistName
        const id = state?._id;
        return {id, name}
    }
);
