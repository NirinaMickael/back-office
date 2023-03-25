import { createAction, props } from '@ngrx/store';
import { UserEntry } from '../../schemas/users.schema';

const source = 'user';

// List Users
export const userLoadRequested = createAction(`[${source}] load requested`);
export const userLoaded = createAction(
  `[${source}] loaded`,
  props<{ entries: UserEntry[] }>()
);
export const userLoadFailed = createAction(
  `[${source}] load failure`,
  props<{ errorMessage: string }>()
);

// Add User
export const userSaveRequested = createAction(
  `[${source}] save requested`,
  props<{ input: UserEntry }>()
);

export const userSaved = createAction(
  `[${source}] saved`,
  props<{ entry: UserEntry }>()
);

export const userSaveFailed = createAction(
  `[${source}] save failure`,
  props<{ errorMessage: string }>()
);

// Update User
export const userUpdateRequested = createAction(
  `[${source}] update requested`,
  props<{ param: string, body: any }>()
);

export const userUpdated = createAction(
  `[${source}] updated`,
  props<{ entry: UserEntry }>()
);

export const userUpdateFailed = createAction(
  `[${source}] update failure`,
  props<{ errorMessage: string }>()
);

// Delete User
export const userDeleteRequested = createAction(
  `[${source}] delete requested`,
  props<{ entry: UserEntry }>()
);

export const userDeleted = createAction(
  `[${source}] deleted`,
  props<{ entry: UserEntry }>()
);

export const userDeleteFailed = createAction(
  `[${source}] delete failure`,
  props<{ errorMessage: string }>()
);