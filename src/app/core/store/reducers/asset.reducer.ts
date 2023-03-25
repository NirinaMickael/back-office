import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { AssetEntry, AssetState } from "../../schemas/asset.schema";
import { assetLoadRequested, assetLoaded, assetSaveRequested, uploadRequested, assetSaved, uploadFinished, assetSaving, uploadProcessing, assetUpdateRequested, assetUpdated, assetDeleteRequested, assetDeleted, assetLoadFailed, assetSaveFailed, assetUpdateFailed, uploadFailed } from "../actions/asset.action";

export const adapter: EntityAdapter<AssetEntry> = createEntityAdapter<AssetEntry>({
    selectId: (entry) => entry._id,
});

export const initialState: AssetState = adapter.getInitialState({
    loading: false,
    listEntries: [],
    errorMessage: undefined,
    saving: false,
    uploadState: undefined,
});

export const AssetReducer = createReducer(
    initialState,
    // select
    on(assetLoadRequested,
        (state) => ({
            ...state,
            loading: true,
            errorMessage: undefined,
        })),
    on(assetLoaded,
        (state, { entries }) => {
            return adapter.setAll(entries, {
                ...state,
                loading: false
            });
        }),

    // save
    on(assetSaveRequested, uploadRequested,
        (state) => ({
            ...state,
            saving: true,
            errorMessage: undefined,
            uploadState: undefined
        })),
    on(assetSaved,
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
    on(assetSaving, uploadProcessing,
        (state, { uploadState }) => {
            return {
                ...state,
                uploadState
            };
        }),

    // update
    on(assetUpdateRequested,
        (state) => ({
            ...state,
            saving: true,
            errorMessage: undefined,
            uploadState: undefined
        })),
    on(assetUpdated, (state, { entry }) => {
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
    on(assetDeleteRequested,
        (state) => ({
            ...state,
            saving: true,
            errorMessage: undefined,
        })),
    on(assetDeleted,
        (state, { entry }) => {
            return adapter.removeOne(entry._id, {
                ...state,
                saving: false
            });
        }),

    // error
    on(
        assetLoadFailed,
        assetSaveFailed,
        assetUpdateFailed,
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