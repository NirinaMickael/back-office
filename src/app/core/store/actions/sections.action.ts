import { createAction, props } from '@ngrx/store';
import { SectionEntry } from '../../schemas/section.schema';

const source = 'section';

// List Sections
export const sectionLoadRequested = createAction(`[${source}] load requested`);
export const sectionLoaded = createAction(
  `[${source}] loaded`,
  props<{ entries: SectionEntry[] }>()
);
export const sectionLoadFailed = createAction(
  `[${source}] load failure`,
  props<{ errorMessage: string }>()
);

// Add Section
export const sectionSaveRequested = createAction(
  `[${source}] save requested`,
  props<{ input: SectionEntry }>()
);

export const sectionSaved = createAction(
  `[${source}] saved`,
  props<{ entry: SectionEntry }>()
);

export const sectionSaveFailed = createAction(
  `[${source}] save failure`,
  props<{ errorMessage: string }>()
);

// Update Section
export const sectionUpdateRequested = createAction(
  `[${source}] update requested`,
  props<{ param: string, body: any }>()
);

export const sectionUpdated = createAction(
  `[${source}] updated`,
  props<{ entry: SectionEntry }>()
);

export const sectionUpdateFailed = createAction(
  `[${source}] update failure`,
  props<{ errorMessage: string }>()
);

// Delete Section
export const sectionDeleteRequested = createAction(
  `[${source}] delete requested`,
  props<{ entry: SectionEntry }>()
);

export const sectionDeleted = createAction(
  `[${source}] deleted`,
  props<{ entry: SectionEntry }>()
);

export const sectionDeleteFailed = createAction(
  `[${source}] delete failure`,
  props<{ errorMessage: string }>()
);