import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { UserEntry, UserState } from '../../schemas/users.schema';
import { userDeleted, userDeleteFailed, userDeleteRequested, userLoaded, userLoadFailed, userLoadRequested, userSaved, userSaveFailed, userSaveRequested, userUpdated, userUpdateFailed, userUpdateRequested } from '../actions/users.action';

export const adapter: EntityAdapter<UserEntry> = createEntityAdapter<UserEntry>({
    selectId: (entry) => entry._id,
    sortComparer: sortByCretedDate,
});

export const initialState: UserState = adapter.getInitialState({
    loading: false,
    saving: false,
    account: undefined,
    selectedAccountId: undefined,
    errorMessage: undefined,
});

export const UserReducer = createReducer(
    initialState,
    // select
    on(userLoadRequested, (state) => ({
        ...state,
        loading: true
    })),
    on(userLoaded, (state, { entries }) => {
        return adapter.setAll(entries, {
            ...state,
            loading: false,
            errorMessage: undefined,
        });
    }),
    // save
    on(userSaveRequested, (state) => ({
        ...state,
        saving: true
    })),
    on(userSaved, (state, { entry }) => {
        return adapter.addOne(entry, {
            ...state,
            saving: false,
            userAdded: entry,
            errorMessage: undefined
        });
    }),
    // update
    on(userUpdateRequested, (state) => ({
        ...state,
        saving: true
    })),
    on(userUpdated, (state, { entry }) => {
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
    on(userDeleteRequested, (state) => ({
        ...state,
        saving: true
    })),
    on(userDeleted, (state, { entry }) => {
        return adapter.removeOne(entry._id, {
            ...state,
            saving: false,
            errorMessage: undefined
        });
    }),
    // error
    on(
        userLoadFailed,
        userSaveFailed,
        userUpdateFailed,
        userDeleteFailed,
        (state, { errorMessage }) => {
            return {
                ...state,
                loading: false,
                saving: false,
                errorMessage,
                user: undefined,
            };
        }),
);

export function sortByCretedDate(a: UserEntry, b: UserEntry): number {
    return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
}

export const {
    selectAll,
} = adapter.getSelectors()
