import { createAction, props } from '@ngrx/store';
import { SliderEntry } from '../../schemas/slider.schema';

const source = 'slider';

// List Sliders
export const sliderLoadRequested = createAction(`[${source}] load requested`);
export const sliderLoaded = createAction(
  `[${source}] loaded`,
  props<{ entries: SliderEntry[] }>()
);
export const sliderLoadFailed = createAction(
  `[${source}] load failure`,
  props<{ errorMessage: string }>()
);

// Add Slider
export const sliderSaveRequested = createAction(
  `[${source}] save requested`,
  props<{ input: SliderEntry }>()
);

export const sliderSaved = createAction(
  `[${source}] saved`,
  props<{ entry: SliderEntry }>()
);

export const sliderSaveFailed = createAction(
  `[${source}] save failure`,
  props<{ errorMessage: string }>()
);

// Update Slider
export const sliderUpdateRequested = createAction(
  `[${source}] update requested`,
  props<{ param: string, body: any }>()
);

export const sliderUpdated = createAction(
  `[${source}] updated`,
  props<{ entry: SliderEntry }>()
);

export const sliderUpdateFailed = createAction(
  `[${source}] update failure`,
  props<{ errorMessage: string }>()
);

// Delete Slider
export const sliderDeleteRequested = createAction(
  `[${source}] delete requested`,
  props<{ entry: SliderEntry }>()
);

export const sliderDeleted = createAction(
  `[${source}] deleted`,
  props<{ entry: SliderEntry }>()
);

export const sliderDeleteFailed = createAction(
  `[${source}] delete failure`,
  props<{ errorMessage: string }>()
);