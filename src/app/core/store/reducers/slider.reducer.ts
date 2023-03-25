import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { sliderDeleted, sliderDeleteFailed, sliderDeleteRequested, sliderLoaded, sliderLoadFailed, sliderLoadRequested, sliderSaved, 
    sliderSaveFailed, sliderSaveRequested, sliderUpdated, sliderUpdateFailed, sliderUpdateRequested } from '../actions/sliders.action';
import { SliderEntry, SliderState } from '../../schemas/slider.schema';

export const adapter: EntityAdapter<SliderEntry> = createEntityAdapter<SliderEntry>({
    selectId: (entry) => entry._id
});

export const initialState: SliderState = adapter.getInitialState({
    loading: false,
    listEntries: [],
    errorMessage: undefined,
    saving: false,
    uploadState: undefined,
});

export const SliderReducer = createReducer(
    initialState,
    // select
    on(sliderLoadRequested, (state) => ({
        ...state,
        loading: true
    })),
    on(sliderLoaded, (state, { entries }) => {
        return adapter.setAll(entries, {
            ...state,
            loading: false,
            errorMessage: undefined,
        });
    }),
    // save
    on(sliderSaveRequested, (state) => ({
        ...state,
        saving: true
    })),
    on(sliderSaved, (state, { entry }) => {
        return adapter.addOne(entry, {
            ...state,
            saving: false,
            sliderAdded: entry,
            errorMessage: undefined
        });
    }),
    // update
    on(sliderUpdateRequested, (state) => ({
        ...state,
        saving: true
    })),
    on(sliderUpdated, (state, { entry }) => {
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
    on(sliderDeleteRequested, (state) => ({
        ...state,
        saving: true
    })),
    on(sliderDeleted, (state, { entry }) => {
        return adapter.removeOne(entry._id, {
            ...state,
            saving: false,
            errorMessage: undefined
        });
    }),
    // error
    on(
        sliderLoadFailed,
        sliderSaveFailed,
        sliderUpdateFailed,
        sliderDeleteFailed,
        (state, { errorMessage }) => {
            return {
                ...state,
                loading: false,
                saving: false,
                errorMessage,
                slider: undefined,
            };
        }),
);

export const {
    selectAll,
} = adapter.getSelectors();
