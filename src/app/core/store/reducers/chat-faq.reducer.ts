import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { ChatFaqEntry, ChatFaqState } from '../../schemas/chat-faq.schema';
import {
  chatFaqDeleted,
  chatFaqDeleteFailed,
  chatFaqDeleteRequested,
  chatFaqLoaded,
  chatFaqLoadFailed,
  chatFaqLoadRequested,
  chatFaqSaved,
  chatFaqSaveFailed,
  chatFaqSaveRequested,
  chatFaqUpdated,
  chatFaqUpdateFailed,
  chatFaqUpdateRequested,
} from '../actions/chat-faq.action';

export const adapter: EntityAdapter<ChatFaqEntry> =
  createEntityAdapter<ChatFaqEntry>({
    selectId: (entry) => entry._id,
    sortComparer: sortByCretedDate,
  });

export const initialState: ChatFaqState = adapter.getInitialState({
  loading: false,
  saving: false,
  errorMessage: undefined,
});

export const ChatFaqReducer = createReducer(
  initialState,
  // select
  on(chatFaqLoadRequested, (state) => ({
    ...state,
    loading: true,
  })),
  on(chatFaqLoaded, (state, { entries }) => {
    return adapter.setAll(entries, {
      ...state,
      loading: false,
      errorMessage: undefined,
    });
  }),
  // save
  on(chatFaqSaveRequested, (state) => ({
    ...state,
    saving: true,
  })),
  on(chatFaqSaved, (state, { entry }) => {
    return adapter.addOne(entry, {
      ...state,
      saving: false,
      errorMessage: undefined,
    });
  }),
  // update
  on(chatFaqUpdateRequested, (state) => ({
    ...state,
    saving: true,
  })),
  on(chatFaqUpdated, (state, { entry }) => {
    return adapter.updateOne(
      {
        id: entry._id,
        changes: entry,
      },
      {
        ...state,
        saving: false,
        errorMessage: undefined,
      }
    );
  }),
  // delete
  on(chatFaqDeleteRequested, (state) => ({
    ...state,
    loading: true,
  })),
  on(chatFaqDeleted, (state, { entry }) => {
    return adapter.removeOne(entry._id, {
      ...state,
      loading: false,
      errorMessage: undefined,
    });
  }),
  // error
  on(
    chatFaqLoadFailed,
    chatFaqSaveFailed,
    chatFaqUpdateFailed,
    chatFaqDeleteFailed,
    (state, { errorMessage }) => {
      return {
        ...state,
        loading: false,
        saving: false,
        errorMessage,
      };
    }
  )
);

export function sortByCretedDate(a: ChatFaqEntry, b: ChatFaqEntry): number {
  return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
}

export const { selectAll } = adapter.getSelectors();
