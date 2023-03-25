import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { UserEntry, AccountState, UserState } from '../../schemas/users.schema';
import {
    accountLoginFail,
    accountLoginRequested,
    accountLoginSuccess,
    accountLogoutFail,
    accountLogoutRequested,
    accountLogoutSuccess,
    forgotPasswordFail,
    forgotPasswordRequested,
    forgotPasswordSuccess,
    getUserRequested,
    getUserSuccess,
    resetPasswordFail,
    resetPasswordRequested,
    resetPasswordSuccess,
    getComparePasswordRequested,
    getComparePasswordSuccess,
    getComparePasswordFail
} from '../actions/account.action';

export const AccountAdapter: EntityAdapter<UserEntry> = createEntityAdapter<UserEntry>({
    selectId: (entry) => entry.email,
});

export const initialState: UserState = AccountAdapter.getInitialState({
    loading: false,
    saving: false,
    errorMessage: undefined,
    account: undefined,
    selectedAccountId: undefined
});

export const AccountReducer = createReducer(
    initialState,
    // Request
    on(
        accountLoginRequested,
        accountLogoutRequested,
        forgotPasswordRequested,
        resetPasswordRequested,
        getUserRequested,
        getComparePasswordRequested,
        (state) => {
            return {
                ...state,
                loading: true,
                errorMessage: undefined,
                account: undefined
            };
        }
    ),
    on(forgotPasswordSuccess, resetPasswordSuccess,
        (state) => {
            return {
                ...state,
                loading: false,
                errorMessage: undefined,
            };
        }
    ),
    // Login reducer
    on(
        accountLoginSuccess,
        getUserSuccess,
        (state, { entry }) => {
            return AccountAdapter.addOne(entry, {
                ...state,
                loading: false,
                errorMessage: null,
                account: entry
            });
        }),
    on(
        accountLoginFail,
        accountLogoutFail,
        forgotPasswordFail,
        resetPasswordFail,
        getComparePasswordFail,
        (state, { errorMessage }) => {
            return {
                ...state,
                loading: false,
                errorMessage,
                account: undefined
            };
        }
    ),
    // Logout reducer
    on(accountLogoutSuccess, (state) => {
        return AccountAdapter.removeAll({
            ...state,
            loading: false,
            errorMessage: undefined,
            account: undefined
        });
    }),
    // Compare password reducer
    on(getComparePasswordSuccess, (state, { entry }) => {
        return AccountAdapter.updateOne({
            id: entry._id,
            changes: entry
        },
        {
            ...state,
            loading: false,
            errorMessage: undefined
        });
    }),
);