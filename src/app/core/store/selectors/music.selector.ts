import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MusicState } from '../../schemas/music.schema';
import * as fromMusic from '../reducers/music.reducer';

export const getRouteState = createFeatureSelector<MusicState>('Musics');

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

export const selectMusicState = createSelector(
    getRouteState,
    (state) => state
);

export const selectAllMusics = createSelector(
    selectMusicState,
    fromMusic.selectAll
);

export const selectMusicLoading = createSelector(
    selectMusicState,
    ({ loading }) => loading
);

export const selectMusicSaving = createSelector(
    selectMusicState,
    ({ saving }) => saving
);

export const selectMusicError = createSelector(
    selectMusicState,
    ({ errorMessage }) => errorMessage
);

export const selectMusicById = (id) => createSelector(
    selectAllMusics,
    (Musics) => {
        if (Musics instanceof Array) {
            return Musics.find(e => e._id === id)
        } else return undefined;
    }
);
