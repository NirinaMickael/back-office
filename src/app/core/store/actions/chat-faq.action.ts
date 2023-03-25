import { createAction, props } from '@ngrx/store';
import { ChatFaqEntry } from '../../schemas/chat-faq.schema';

const source = 'Chat Faq';

// List Chat Faq
export const chatFaqLoadRequested = createAction(`[${source}] load requested`);
export const chatFaqLoaded = createAction(
  `[${source}] loaded`,
  props<{ entries: ChatFaqEntry[] }>()
);
export const chatFaqLoadFailed = createAction(
  `[${source}] load failure`,
  props<{ errorMessage: string }>()
);

// Add chatFaq
export const chatFaqSaveRequested = createAction(
  `[${source}] save requested`,
  props<{ input: ChatFaqEntry }>()
);

export const chatFaqSaved = createAction(
  `[${source}] saved`,
  props<{ entry: ChatFaqEntry }>()
);

export const chatFaqSaveFailed = createAction(
  `[${source}] save failure`,
  props<{ errorMessage: string }>()
);

// Update chatFaq
export const chatFaqUpdateRequested = createAction(
  `[${source}] update requested`,
  props<{ param: string, body: any }>()
);

export const chatFaqUpdated = createAction(
  `[${source}] updated`,
  props<{ entry: ChatFaqEntry }>()
);

export const chatFaqUpdateFailed = createAction(
  `[${source}] update failure`,
  props<{ errorMessage: string }>()
);

// Delete chatFaq
export const chatFaqDeleteRequested = createAction(
  `[${source}] delete requested`,
  props<{ entry: ChatFaqEntry }>()
);

export const chatFaqDeleted = createAction(
  `[${source}] deleted`,
  props<{ entry: ChatFaqEntry }>()
);

export const chatFaqDeleteFailed = createAction(
  `[${source}] delete failure`,
  props<{ errorMessage: string }>()
);
