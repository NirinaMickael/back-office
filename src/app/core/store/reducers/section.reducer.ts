import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { sectionDeleted, sectionDeleteFailed, sectionDeleteRequested, sectionLoaded, sectionLoadFailed, sectionLoadRequested, sectionSaved, 
    sectionSaveFailed, sectionSaveRequested, sectionUpdated, sectionUpdateFailed, sectionUpdateRequested } from '../actions/sections.action';
import { SectionEntry, SectionState } from '../../schemas/section.schema';

export const adapter: EntityAdapter<SectionEntry> = createEntityAdapter<SectionEntry>({
    selectId: (entry) => entry._id
});

export const initialState: SectionState = adapter.getInitialState({
    loading: false,
    listEntries: [],
    errorMessage: undefined,
    saving: false,
    uploadState: undefined,
});

export const SectionReducer = createReducer(
    initialState,
    // select
    on(sectionLoadRequested, (state) => ({
        ...state,
        loading: true
    })),
    on(sectionLoaded, (state, { entries }) => {
        return adapter.setAll(entries, {
            ...state,
            loading: false,
            errorMessage: undefined,
        });
    }),
    // save
    on(sectionSaveRequested, (state) => ({
        ...state,
        saving: true
    })),
    on(sectionSaved, (state, { entry }) => {
        return adapter.addOne(entry, {
            ...state,
            saving: false,
            sectionAdded: entry,
            errorMessage: undefined
        });
    }),
    // update
    on(sectionUpdateRequested, (state) => ({
        ...state,
        saving: true
    })),
    on(sectionUpdated, (state, { entry }) => {
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
    on(sectionDeleteRequested, (state) => ({
        ...state,
        saving: true
    })),
    on(sectionDeleted, (state, { entry }) => {
        return adapter.removeOne(entry._id, {
            ...state,
            saving: false,
            errorMessage: undefined
        });
    }),
    // error
    on(
        sectionLoadFailed,
        sectionSaveFailed,
        sectionUpdateFailed,
        sectionDeleteFailed,
        (state, { errorMessage }) => {
            return {
                ...state,
                loading: false,
                saving: false,
                errorMessage,
                section: undefined,
            };
        }),
);

export const {
    selectAll,
} = adapter.getSelectors();
