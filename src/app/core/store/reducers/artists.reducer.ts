import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { ArtistEntry,ArtistState } from '../../schemas/artists.schema';
import { artistDeleteFailed,artistDeleted,artistLoadRequested,artistSaveFailed,artistLoaded,artistLoadFailed ,artistSaveRequested, artistSaved, artistUpdateRequested, artistUpdated, artistDeleteRequested, artistUpdateFailed} from '../actions/artists.action';

export const adapter: EntityAdapter<ArtistEntry> = createEntityAdapter<ArtistEntry>({
    selectId: (entry) => entry._id,
    sortComparer: sortByCretedDate,
});

export const initialState: ArtistState = adapter.getInitialState({
    loading: false,
    saving: false,
    artist: undefined,
    selectedArtistId: undefined,
    errorMessage: undefined,
});

export const ArtistReducer = createReducer(
    initialState,
    // select
    on(artistLoadRequested, (state) => ({
        ...state,
        loading: true
    })),
    on(artistLoaded, (state, { entries }) => {
        return adapter.setAll(entries, {
            ...state,
            loading: false,
            errorMessage: undefined,
        });
    }),
    // save
    on(artistSaveRequested, (state) => ({
        ...state,
        saving: true
    })),
    on(artistSaved, (state, { entry }) => {
        return adapter.addOne(entry, {
            ...state,
            saving: false,
            artistAdded: entry,
            errorMessage: undefined
        });
    }),
    // update
    on(artistUpdateRequested, (state) => ({
        ...state,
        saving: true
    })),
    on(artistUpdated, (state, { entry }) => {
        return adapter.updateOne({
            id: entry._id,
            changes: entry
        },
        {
            ...state,
            saving: false,
            errorMessage: undefined
        });
    }),
    // delete
    on(artistDeleteRequested, (state) => ({
        ...state,
        saving: true
    })),
    on(artistDeleted, (state, { entry }) => {
        return adapter.removeOne(entry._id, {
            ...state,
            saving: false,
            errorMessage: undefined
        });
    }),
    // error
    on(
        artistLoadFailed,
        artistSaveFailed,
        artistUpdateFailed,
        artistDeleteFailed,
        (state, { errorMessage }) => {
            return {
                ...state,
                loading: false,
                saving: false,
                errorMessage,
                artist:undefined
            };
        }),
);

export function sortByCretedDate(a: ArtistEntry, b: ArtistEntry): number {
    return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
}

export const {
    selectAll,
} = adapter.getSelectors();
