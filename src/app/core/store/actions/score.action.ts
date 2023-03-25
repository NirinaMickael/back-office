import { createAction, props } from '@ngrx/store';
import { ScoreEntry } from '../../schemas/score.schema';

// List
export const scoreLoadRequested = createAction(`[score] load requested`);
export const scoreLoaded = createAction(
  `[score] loaded`,
  props<{ entries: ScoreEntry[] }>()
);
export const scoreLoadFailed = createAction(
  `[score] load failure`,
  props<{ errorMessage: string }>()
);

// Scene Change
export const sceneChange = createAction(`[score] scene change`,
  props<{ scene: any }>());

// Add
export const scoreSaveRequested = createAction(
  `[score] save requested`,
  props<{ input: any }>()
);
export const scoreSaving = createAction(
  `[score] saving`,
  props<{ uploadState: any }>()
);
export const scoreSaved = createAction(
  `[score] saved`,
  props<{ entry: ScoreEntry }>()
);
export const scoreSaveFailed = createAction(
  `[score] save failure`,
  props<{ errorMessage: string }>()
);

// Delete
export const scoreDeleteRequested = createAction(
  `[score] delete requested`,
  props<{ id: string }>()
);
export const scoreDeleted = createAction(
  `[score] deleted`,
  props<{ entry: ScoreEntry }>()
);
export const scoreDeleteFailed = createAction(
  `[score] delete failure`,
  props<{ errorMessage: string }>()
);

// Update
export const scoreUpdateRequested = createAction(
  `[score] update requested`,
  props<{ param: string, body: any }>()
);
export const scoreUpdated = createAction(
  `[score] updated`,
  props<{ entry: ScoreEntry }>()
);
export const scoreUpdateFailed = createAction(
  `[score] update failure`,
  props<{ errorMessage: string }>()
);

// Upload File
export const uploadRequested = createAction(
  `[score] upload requested`,
  props<{ input: any }>()
);
export const uploadProcessing = createAction(
  `[score] upload processing`,
  props<{ uploadState: any }>()
);
export const uploadFinished = createAction(
  `[score] upload Finished`
);
export const uploadFailed = createAction(
  `[score] upload failure`,
  props<{ errorMessage: string }>()
);
