import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { CategoryEntry,CategoryState } from '../../schemas/caterogy.schema';
import { categoryDeleteFailed,categoryDeleted,categoryLoadRequested,categorySaveFailed,categoryLoaded,categoryLoadFailed ,categorySaveRequested, categorySaved, categoryUpdateRequested, categoryUpdated, categoryDeleteRequested, categoryUpdateFailed} from '../actions/category.action';

export const adapter: EntityAdapter<CategoryEntry> = createEntityAdapter<CategoryEntry>({
    selectId: (entry) => entry._id,
    sortComparer: sortByCretedDate,
});

export const initialState: CategoryState = adapter.getInitialState({
    loading: false,
    saving: false,
    category: undefined,
    selectedCategoryId: undefined,
    errorMessage: undefined,
});

export const CategoryReducer = createReducer(
    initialState,
    // select
    on(categoryLoadRequested, (state) => ({
        ...state,
        loading: true
    })),
    on(categoryLoaded, (state, { entries }) => {
        return adapter.setAll(entries, {
            ...state,
            loading: false,
            errorMessage: undefined,
        });
    }),
    // save
    on(categorySaveRequested, (state) => ({
        ...state,
        saving: true
    })),
    on(categorySaved, (state, { entry }) => {
        return adapter.addOne(entry, {
            ...state,
            saving: false,
            categoryAdded: entry,
            errorMessage: undefined
        });
    }),
    // update
    on(categoryUpdateRequested, (state) => ({
        ...state,
        saving: true
    })),
    on(categoryUpdated, (state, { entry }) => {
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
    on(categoryDeleteRequested, (state) => ({
        ...state,
        saving: true
    })),
    on(categoryDeleted, (state, { entry }) => {
        return adapter.removeOne(entry._id, {
            ...state,
            saving: false,
            errorMessage: undefined
        });
    }),
    // error
    on(
        categoryLoadFailed,
        categorySaveFailed,
        categoryUpdateFailed,
        categoryDeleteFailed,
        (state, { errorMessage }) => {
            return {
                ...state,
                loading: false,
                saving: false,
                errorMessage,
                category:undefined
            };
        }),
);

export function sortByCretedDate(a: CategoryEntry, b: CategoryEntry): number {
    return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
}

export const {
    selectAll,
} = adapter.getSelectors();
