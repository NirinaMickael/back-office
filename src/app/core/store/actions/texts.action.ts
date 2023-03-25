import { createAction, props } from '@ngrx/store';
import { TextEntry } from '../../schemas/text.schema';

const source = 'text';

// List Texts
export const textLoadRequested = createAction(`[${source}] load requested`);
export const textLoaded = createAction(
  `[${source}] loaded`,
  props<{ entries: TextEntry[] }>()
);
export const textLoadFailed = createAction(
  `[${source}] load failure`,
  props<{ errorMessage: string }>()
);

// Add Text
export const textSaveRequested = createAction(
  `[${source}] save requested`,
  props<{ input: TextEntry }>()
);

export const textSaved = createAction(
  `[${source}] saved`,
  props<{ entry: TextEntry }>()
);

export const textSaveFailed = createAction(
  `[${source}] save failure`,
  props<{ errorMessage: string }>()
);

// Update Text
export const textUpdateRequested = createAction(
  `[${source}] update requested`,
  props<{ param: string, body: any }>()
);

export const textUpdated = createAction(
  `[${source}] updated`,
  props<{ entry: TextEntry }>()
);

export const textUpdateFailed = createAction(
  `[${source}] update failure`,
  props<{ errorMessage: string }>()
);

// Delete Text
export const textDeleteRequested = createAction(
  `[${source}] delete requested`,
  props<{ entry: TextEntry }>()
);

export const textDeleted = createAction(
  `[${source}] deleted`,
  props<{ entry: TextEntry }>()
);

export const textDeleteFailed = createAction(
  `[${source}] delete failure`,
  props<{ errorMessage: string }>()
);