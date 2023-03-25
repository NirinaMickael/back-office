import { createAction, props } from '@ngrx/store';
import { AssetEntry } from '../../schemas/asset.schema';

// List
export const assetLoadRequested = createAction(`[asset] load requested`);
export const assetLoaded = createAction(
  `[asset] loaded`,
  props<{ entries: AssetEntry[] }>()
);
export const assetLoadFailed = createAction(
  `[asset] load failure`,
  props<{ errorMessage: string }>()
);

// Add
export const assetSaveRequested = createAction(
  `[asset] save requested`,
  props<{ input: any }>()
);
export const assetSaving = createAction(
  `[asset] saving`,
  props<{ uploadState: any }>()
);
export const assetSaved = createAction(
  `[asset] saved`,
  props<{ entry: AssetEntry }>()
);
export const assetSaveFailed = createAction(
  `[asset] save failure`,
  props<{ errorMessage: string }>()
);

// Delete
export const assetDeleteRequested = createAction(
  `[asset] delete requested`,
  props<{ entry: AssetEntry }>()
);
export const assetDeleted = createAction(
  `[asset] deleted`,
  props<{ entry: AssetEntry }>()
);
export const assetDeleteFailed = createAction(
  `[asset] delete failure`,
  props<{ errorMessage: string }>()
);

// Update
export const assetUpdateRequested = createAction(
  `[asset] update requested`,
  props<{ param: string, body: any }>()
);
export const assetUpdated = createAction(
  `[asset] updated`,
  props<{ entry: AssetEntry }>()
);
export const assetUpdateFailed = createAction(
  `[asset] update failure`,
  props<{ errorMessage: string }>()
);

// Upload File
export const uploadRequested = createAction(
  `[asset] upload requested`,
  props<{ input: any }>()
);
export const uploadProcessing = createAction(
  `[asset] upload processing`,
  props<{ uploadState: any }>()
);
export const uploadFinished = createAction(
  `[asset] upload Finished`
);
export const uploadFailed = createAction(
  `[asset] upload failure`,
  props<{ errorMessage: string }>()
);
