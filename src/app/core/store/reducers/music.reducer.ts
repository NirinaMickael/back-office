import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import {
    MusicDeleted, MusicDeleteFailed, MusicDeleteRequested, MusicLoaded, MusicLoadFailed, MusicLoadRequested, MusicSaved,
    MusicSaveFailed, MusicSaveRequested, MusicUpdated, MusicUpdateFailed, MusicUpdateRequested
} from '../actions/music.action';
import { MusicEntry, MusicState } from '../../schemas/music.schema';

export const adapter: EntityAdapter<MusicEntry> = createEntityAdapter<MusicEntry>({
    selectId: (entry) => entry._id
});

export const initialState: MusicState = adapter.getInitialState({
    loading: false,
    listEntries: [],
    errorMessage: undefined,
    saving: false,
    uploadState: undefined
});

export const MusicReducer = createReducer(
    initialState,
    // select
    on(MusicLoadRequested, (state) => ({
        ...state,
        loading: true
    })),
    on(MusicLoaded, (state, { entries }) => {
        return adapter.setAll(entries, {
            ...state,
            loading: false,
            errorMessage: undefined,
        });
    }),
    // save
    on(MusicSaveRequested, (state) => ({
        ...state,
        saving: true
    })),
    on(MusicSaved, (state, { entry }) => {
        return adapter.addOne(entry, {
            ...state,
            saving: false,
            MusicAdded: entry,
            errorMessage: undefined
        });
    }),
    // update
    on(MusicUpdateRequested, (state) => ({
        ...state,
        saving: true
    })),
    on(MusicUpdated, (state, { entry }) => {
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
    on(MusicDeleteRequested, (state) => ({
        ...state,
        saving: true
    })),
    on(MusicDeleted, (state, { entry }) => {
        return adapter.removeOne(entry._id, {
            ...state,
            saving: false,
            errorMessage: undefined
        });
    }),
    // error
    on(
        MusicLoadFailed,
        MusicSaveFailed,
        MusicUpdateFailed,
        MusicDeleteFailed,
        (state, { errorMessage }) => {
            return {
                ...state,
                loading: false,
                saving: false,
                errorMessage,
                Music: undefined,
            };
        }),
);

export const {
    selectAll,
} = adapter.getSelectors();
