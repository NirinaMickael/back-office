import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { textDeleted, textDeleteFailed, textDeleteRequested, textLoaded, textLoadFailed, textLoadRequested, textSaved, 
    textSaveFailed, textSaveRequested, textUpdated, textUpdateFailed, textUpdateRequested } from '../actions/texts.action';
import { TextEntry, TextState } from '../../schemas/text.schema';

export const adapter: EntityAdapter<TextEntry> = createEntityAdapter<TextEntry>({
    selectId: (entry) => entry._id
});

export const initialState: TextState = adapter.getInitialState({
    loading: false,
    listEntries: [],
    errorMessage: undefined,
    saving: false,
    uploadState: undefined,
});

export const TextReducer = createReducer(
    initialState,
    // select
    on(textLoadRequested, (state) => ({
        ...state,
        loading: true
    })),
    on(textLoaded, (state, { entries }) => {
        return adapter.setAll(entries, {
            ...state,
            loading: false,
            errorMessage: undefined,
        });
    }),
    // save
    on(textSaveRequested, (state) => ({
        ...state,
        saving: true
    })),
    on(textSaved, (state, { entry }) => {
        return adapter.addOne(entry, {
            ...state,
            saving: false,
            textAdded: entry,
            errorMessage: undefined
        });
    }),
    // update
    on(textUpdateRequested, (state) => ({
        ...state,
        saving: true
    })),
    on(textUpdated, (state, { entry }) => {
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
    on(textDeleteRequested, (state) => ({
        ...state,
        saving: true
    })),
    on(textDeleted, (state, { entry }) => {
        return adapter.removeOne(entry._id, {
            ...state,
            saving: false,
            errorMessage: undefined
        });
    }),
    // error
    on(
        textLoadFailed,
        textSaveFailed,
        textUpdateFailed,
        textDeleteFailed,
        (state, { errorMessage }) => {
            return {
                ...state,
                loading: false,
                saving: false,
                errorMessage,
                text: undefined,
            };
        }),
);

export const {
    selectAll,
} = adapter.getSelectors();
