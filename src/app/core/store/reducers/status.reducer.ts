
import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { StatusEntry,StatusState } from '../../schemas/status.schema';
import { statusDeleteFailed,statusDeleted,statusLoadRequested,statusSaveFailed,statusLoaded,statusLoadFailed ,statusSaveRequested, statusSaved, statusUpdateRequested, statusUpdated, statusDeleteRequested, statusUpdateFailed} from '../actions/status.action';

export const adapter: EntityAdapter<StatusEntry> = createEntityAdapter<StatusEntry>({
    selectId: (entry) => entry._id,
    sortComparer: sortByCretedDate,
});

export const initialState: StatusState = adapter.getInitialState({
    loading: false,
    saving: false,
    status: undefined,
    selectedStatusId: undefined,
    errorMessage: undefined,
});

export const StatusReducer = createReducer(
    initialState,
    // select
    on(statusLoadRequested, (state) => ({
        ...state,
        loading: true
    })),
    on(statusLoaded, (state, { entries }) => {
        return adapter.setAll(entries, {
            ...state,
            loading: false,
            errorMessage: undefined,
        });
    }),
    // save
    on(statusSaveRequested, (state) => ({
        ...state,
        saving: true
    })),
    on(statusSaved, (state, { entry }) => {
        return adapter.addOne(entry, {
            ...state,
            saving: false,
            statusAdded: entry,
            errorMessage: undefined
        });
    }),
    // update
    on(statusUpdateRequested, (state) => ({
        ...state,
        saving: true
    })),
    on(statusUpdated, (state, { entry }) => {
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
    on(statusDeleteRequested, (state) => ({
        ...state,
        saving: true
    })),
    on(statusDeleted, (state, { entry }) => {
        return adapter.removeOne(entry._id, {
            ...state,
            saving: false,
            errorMessage: undefined
        });
    }),
    // error
    on(
        statusLoadFailed,
        statusSaveFailed,
        statusUpdateFailed,
        statusDeleteFailed,
        (state, { errorMessage }) => {
            return {
                ...state,
                loading: false,
                saving: false,
                errorMessage,
                status:undefined
            };
        }),
);

export function sortByCretedDate(a: StatusEntry, b: StatusEntry): number {
    return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
}

export const {
    selectAll,
} = adapter.getSelectors();
