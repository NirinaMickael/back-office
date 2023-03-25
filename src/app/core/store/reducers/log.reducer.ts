import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { LogEntry, LogState } from "../../schemas/log.schema";
import { logLoadRequested, logLoaded, logSaveRequested, logSaved, logSaving, logUpdateRequested, logUpdated, logDeleteRequested, logDeleted, logLoadFailed, logSaveFailed, logUpdateFailed } from "../actions/log.action";

export const adapter: EntityAdapter<LogEntry> = createEntityAdapter<LogEntry>({
    selectId: (entry) => entry._id,
});

export const initialState: LogState = adapter.getInitialState({
    loading: false,
    listEntries: [],
    errorMessage: undefined,
    saving: false,
    uploadState: undefined,
});

export const LogReducer = createReducer(
    initialState,
    // select
    on(logLoadRequested,
        (state) => ({
            ...state,
            loading: true,
            errorMessage: undefined,
        })),
    on(logLoaded,
        (state, { entries }) => {
            return adapter.setAll(entries, {
                ...state,
                loading: false
            });
        }),

    // update
    on(logUpdateRequested,
        (state) => ({
            ...state,
            saving: true,
            errorMessage: undefined,
            uploadState: undefined
        })),
    on(logUpdated, (state, { entry }) => {
        return adapter.updateOne(
            {
                id: entry._id,
                changes: entry,
            },
            {
                ...state,
                saving: false,
                uploadState: undefined
            }
        );
    }),

    // delete
    on(logDeleteRequested,
        (state) => ({
            ...state,
            saving: true,
            errorMessage: undefined,
        })),
    on(logDeleted,
        (state, { entry }) => {
            return adapter.removeOne(entry._id, {
                ...state,
                saving: false
            });
        }),

    // error
    on(
        logLoadFailed,
        logSaveFailed,
        logUpdateFailed,
        (state, { errorMessage }) => {
            return {
                ...state,
                loading: false,
                errorMessage,
                saving: false
            };
        }),

);

export const {
    selectAll,
} = adapter.getSelectors();