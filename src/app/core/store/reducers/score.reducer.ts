import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { ScoreEntry, ScoreState } from "../../schemas/score.schema";
import { scoreLoadRequested, scoreLoaded, scoreSaveRequested, uploadRequested, scoreSaved, uploadFinished, scoreSaving, uploadProcessing, scoreUpdateRequested, scoreUpdated, scoreDeleteRequested, scoreDeleted, sceneChange, scoreLoadFailed, scoreSaveFailed, scoreUpdateFailed, uploadFailed } from "../actions/score.action";

export const adapter: EntityAdapter<ScoreEntry> = createEntityAdapter<ScoreEntry>({
    selectId: (entry) => entry._id,
});

export const initialState: ScoreState = adapter.getInitialState({
    loading: false,
    listEntries: [],
    errorMessage: undefined,
    saving: false,
    uploadState: undefined,
});

export const ScoreReducer = createReducer(
    initialState,
    // select
    on(scoreLoadRequested,
        (state) => ({
            ...state,
            loading: true,
            errorMessage: undefined,
        })),
    on(scoreLoaded,
        (state, { entries }) => {
            return adapter.setAll(entries, {
                ...state,
                loading: false
            });
        }),

    // save
    on(scoreSaveRequested, uploadRequested,
        (state) => ({
            ...state,
            saving: true,
            errorMessage: undefined,
            uploadState: undefined
        })),
    on(scoreSaved,
        (state, { entry }) => {
            return adapter.addOne(entry, {
                ...state,
                saving: false,
                uploadState: undefined
            });
        }),
    on(uploadFinished,
        (state) => {
            return {
                ...state,
                saving: false,
                uploadState: undefined
            }
        }),
    on(scoreSaving, uploadProcessing,
        (state, { uploadState }) => {
            return {
                ...state,
                uploadState
            };
        }),

    // update
    on(scoreUpdateRequested,
        (state) => ({
            ...state,
            saving: true,
            errorMessage: undefined,
            uploadState: undefined
        })),
    on(scoreUpdated, (state, { entry }) => {
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
    on(scoreDeleteRequested,
        (state) => ({
            ...state,
            saving: true,
            errorMessage: undefined,
        })),
    on(scoreDeleted,
        (state, { entry }) => {
            return adapter.removeOne(entry._id, {
                ...state,
                saving: false
            });
        }),

    // error
    on(
        scoreLoadFailed,
        scoreSaveFailed,
        scoreUpdateFailed,
        uploadFailed,
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