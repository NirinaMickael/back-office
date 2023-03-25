import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserEntry, UserState } from '../../schemas/users.schema';
import * as fromUser from '../reducers/users.reducer';

export const getRouteState = createFeatureSelector<UserState>('users');

export const selectUserState = createSelector(
    getRouteState,
    (state) => state
);
export const selectAllUsers = createSelector(
    selectUserState,
    fromUser.selectAll
);

export const selectUserLoading = createSelector(
    selectUserState,
    ({ loading }) => loading
);

export const selectUserSaving = createSelector(
    selectUserState,
    ({ saving }) => saving
);

export const selectUserErrorMessage = createSelector(
    selectUserState,
    ({ errorMessage }) => errorMessage
);

export const selectCurrentUser = (id) => createSelector(
    selectUserState,
    (state) => {
        let currentUser = [];
        for (let i in state.entities) {
            if (state.entities[i]._id == id) {
                currentUser.push(state.entities[i]);
            }
        }

        return currentUser;
    }
);

export const selectUserByRole = (role:string) => createSelector(
    selectUserState,
    (state)=>{
        return fromUser.selectAll(state).filter((user:UserEntry)=>user.role==role);
    }
)