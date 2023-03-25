import { createAction, props } from '@ngrx/store';
import { UserEntry, AccountLogin, AccountLogout } from '../../schemas/users.schema';

const source = 'account';

// Login
export const accountLoginRequested = createAction(
    `[${source}] login requested`,
    props<{ input: AccountLogin }>()
);
export const accountLoginSuccess = createAction(
    `[${source}] login success`,
    props<{ entry: UserEntry }>()
);
export const accountLoginFail = createAction(
    `[${source}] login fail`,
    props<{ errorMessage: any }>()
);

// Forgot password
export const forgotPasswordRequested = createAction(
    `[${source}] forgot password requested`,
    props<{ input: any }>()
);
export const forgotPasswordSuccess = createAction(
    `[${source}] forgot password success`
);
export const forgotPasswordFail = createAction(
    `[${source}] forgot password fail`,
    props<{ errorMessage: any }>()
);

// Get new access token
export const getNewAccessTokenRequested = createAction(
    `[${source}] get new access token requested`
);
export const getNewAccessTokenSuccess = createAction(
    `[${source}] get new access token success`
);
export const getNewAccessTokenFail = createAction(
    `[${source}] get new access token fail`,
    props<{ errorMessage: any }>()
);

// Reset password
export const resetPasswordRequested = createAction(
    `[${source}] reset password requested`,
    props<{ param: string, body: any }>()
);
export const resetPasswordSuccess = createAction(
    `[${source}] reset password success`
);
export const resetPasswordFail = createAction(
    `[${source}] reset password fail`,
    props<{ errorMessage: any }>()
);

// Logout
export const accountLogoutRequested = createAction(
    `[${source}] logout requested`,
    props<{ input: AccountLogout }>()
);
export const accountLogoutSuccess = createAction(`[${source}] logout success`);
export const accountLogoutFail = createAction(
    `[${source}] logout fail`,
    props<{ errorMessage: any }>()
);

// Get Account
export const getUserRequested = createAction(
    `[${source}] get account requested`,
    props<{ input: { _id: string } }>()
);
export const getUserSuccess = createAction(
    `[${source}] get account success`,
    props<{ entry: UserEntry }>()
);
export const getUserFail = createAction(
    `[${source}] get account fail`,
    props<{ errorMessage: any }>()
);

// Compare Password
export const getComparePasswordRequested = createAction(
    `[${source}] get compare password requested`,
    props<{ input: { _id: string, password: string } }>()
);
export const getComparePasswordSuccess = createAction(
    `[${source}] get compare password success`,
    props<{ entry: UserEntry }>()
);
export const getComparePasswordFail = createAction(
    `[${source}] get compare password fail`,
    props<{ errorMessage: any }>()
);