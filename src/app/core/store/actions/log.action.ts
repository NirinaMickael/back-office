import { createAction, props } from '@ngrx/store';
import { LogEntry } from '../../schemas/log.schema';

// List
export const logLoadRequested = createAction(`[log] load requested`);
export const logLoaded = createAction(
  `[log] loaded`,
  props<{ entries: LogEntry[] }>()
);
export const logLoadFailed = createAction(
  `[log] load failure`,
  props<{ errorMessage: string }>()
);


// Add
export const logSaveRequested = createAction(
  `[log] save requested`,
  props<{ input: any }>()
);
export const logSaving = createAction(
  `[log] saving`,
  props<{ uploadState: any }>()
);
export const logSaved = createAction(
  `[log] saved`,
  props<{ entry: LogEntry }>()
);
export const logSaveFailed = createAction(
  `[log] save failure`,
  props<{ errorMessage: string }>()
);

// Delete
export const logDeleteRequested = createAction(
  `[log] delete requested`,
  props<{ id: string }>()
);
export const logDeleted = createAction(
  `[log] deleted`,
  props<{ entry: LogEntry }>()
);
export const logDeleteFailed = createAction(
  `[log] delete failure`,
  props<{ errorMessage: string }>()
);

// Update
export const logUpdateRequested = createAction(
  `[log] update requested`,
  props<{ param: string, body: any }>()
);
export const logUpdated = createAction(
  `[log] updated`,
  props<{ entry: LogEntry }>()
);
export const logUpdateFailed = createAction(
  `[log] update failure`,
  props<{ errorMessage: string }>()
);
