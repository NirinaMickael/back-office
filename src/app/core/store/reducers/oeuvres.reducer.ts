import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { OeuvreEntry,OeuvreState } from '../../schemas/oeuvre.schema';
import { oeuvreDeleteFailed,oeuvreDeleted,oeuvreLoadRequested,oeuvreSaveFailed,oeuvreLoaded,oeuvreLoadFailed ,oeuvreSaveRequested, oeuvreSaved, oeuvreUpdateRequested, oeuvreUpdated, oeuvreDeleteRequested, oeuvreUpdateFailed} from '../actions/oeuvres.action';

export const adapter: EntityAdapter<OeuvreEntry> = createEntityAdapter<OeuvreEntry>({
    selectId: (entry) => entry._id,
    sortComparer: sortByCretedDate,
});

export const initialState: OeuvreState = adapter.getInitialState({
    loading: false,
    saving: false,
    oeuvre: undefined,
    selectedOeuvreId: undefined,
    errorMessage: undefined,
});

export const OeuvreReducer = createReducer(
    initialState,
    // select
    on(oeuvreLoadRequested, (state) => ({
        ...state,
        loading: true
    })),
    on(oeuvreLoaded, (state, { entries }) => {
        return adapter.setAll(entries, {
            ...state,
            loading: false,
            errorMessage: undefined,
        });
    }),
    // save
    on(oeuvreSaveRequested, (state) => ({
        ...state,
        saving: true
    })),
    on(oeuvreSaved, (state, { entry }) => {
        return adapter.addOne(entry, {
            ...state,
            saving: false,
            oeuvreAdded: entry,
            errorMessage: undefined
        });
    }),
    // update
    on(oeuvreUpdateRequested, (state) => ({
        ...state,
        saving: true
    })),
    on(oeuvreUpdated, (state, { entry }) => {
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
    on(oeuvreDeleteRequested, (state) => ({
        ...state,
        saving: true
    })),
    on(oeuvreDeleted, (state, { entry }) => {
        return adapter.removeOne(entry._id, {
            ...state,
            saving: false,
            errorMessage: undefined
        });
    }),
    // error
    on(
        oeuvreLoadFailed,
        oeuvreSaveFailed,
        oeuvreUpdateFailed,
        oeuvreDeleteFailed,
        (state, { errorMessage }) => {
            return {
                ...state,
                loading: false,
                saving: false,
                errorMessage,
                oeuvre:undefined
            };
        }),
);

export function sortByCretedDate(a: OeuvreEntry, b: OeuvreEntry): number {
    return new Date(b.createdOn).valueOf() - new Date(a.createdOn).valueOf();
}

export const {
    selectAll,
} = adapter.getSelectors();
