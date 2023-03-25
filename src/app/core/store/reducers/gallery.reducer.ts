import { createReducer,on } from "@ngrx/store";
import { createEntityAdapter,EntityAdapter } from "@ngrx/entity";
import { GalleryEntry , GalleryState } from "../../schemas/custom.schema";
import { galleryDeleteFailed,galleryDeleted,galleryLoadRequested,gallerySaveFailed,galleryLoaded,galleryLoadFailed ,gallerySaveRequested, gallerySaved, galleryUpdateRequested, galleryUpdated, galleryDeleteRequested, galleryUpdateFailed} from '../actions/gallery.action';


export const adapter: EntityAdapter<GalleryEntry> = createEntityAdapter<GalleryEntry>({
    selectId: (entry) => entry._id,
    sortComparer: sortByCretedDate,
});

export const initialState: GalleryState = adapter.getInitialState({
    loading: false,
    saving: false,
    gallery: undefined,
    selectedGalleryId : undefined,
    errorMessage: undefined,
});

export const GalleryReducer = createReducer(
    initialState,
    // select
    on(galleryLoadRequested, (state) => ({
        ...state,
        loading: true
    })),
    on(galleryLoaded, (state, { entries }) => {
        return adapter.setAll(entries, {
            ...state,
            loading: false,
            errorMessage: undefined,
        });
    }),
    // save
    on(gallerySaveRequested, (state) => ({
        ...state,
        saving: true
    })),
    on(gallerySaved, (state, { entry }) => {
        return adapter.addOne(entry, {
            ...state,
            saving: false,
            galleryAdded: entry,
            errorMessage: undefined
        });
    }),
    // update
    on(galleryUpdateRequested, (state) => ({
        ...state,
        saving: true
    })),
    on(galleryUpdated, (state, { entry }) => {
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
    on(galleryDeleteRequested, (state) => ({
        ...state,
        saving: true
    })),
    on(galleryDeleted, (state, { entry }) => {
        return adapter.removeOne(entry._id, {
            ...state,
            saving: false,
            errorMessage: undefined
        });
    }),
    // error
    on(
        galleryLoadFailed,
        gallerySaveFailed,
        galleryUpdateFailed,
        galleryDeleteFailed,
        (state, { errorMessage }) => {
            return {
                ...state,
                loading: false,
                saving: false,
                errorMessage,
                gallery:undefined
            };
        }),
);

export function sortByCretedDate(a: GalleryEntry, b: GalleryEntry): number {
    return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
}

export const {
    selectAll,
} = adapter.getSelectors();
