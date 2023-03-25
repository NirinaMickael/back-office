import { createAction, props } from '@ngrx/store';
import { MusicEntry } from '../../schemas/music.schema';

const source = 'game-music';

// List Musics
export const MusicLoadRequested = createAction(`[${source}] load requested`);
export const MusicLoaded = createAction(
  `[${source}] loaded`,
  props<{ entries: MusicEntry[] }>()
);
export const MusicLoadFailed = createAction(
  `[${source}] load failure`,
  props<{ errorMessage: string }>()
);

// Add Music
export const MusicSaveRequested = createAction(
  `[${source}] save requested`,
  props<{ input: MusicEntry }>()
);

export const MusicSaved = createAction(
  `[${source}] saved`,
  props<{ entry: MusicEntry }>()
);

export const MusicSaveFailed = createAction(
  `[${source}] save failure`,
  props<{ errorMessage: string }>()
);

// Update Music
export const MusicUpdateRequested = createAction(
  `[${source}] update requested`,
  props<{ param: string, body: any }>()
);

export const MusicUpdated = createAction(
  `[${source}] updated`,
  props<{ entry: MusicEntry }>()
);

export const MusicUpdateFailed = createAction(
  `[${source}] update failure`,
  props<{ errorMessage: string }>()
);

// Delete Music
export const MusicDeleteRequested = createAction(
  `[${source}] delete requested`,
  props<{ entry: MusicEntry }>()
);

export const MusicDeleted = createAction(
  `[${source}] deleted`,
  props<{ entry: MusicEntry }>()
);

export const MusicDeleteFailed = createAction(
  `[${source}] delete failure`,
  props<{ errorMessage: string }>()
);