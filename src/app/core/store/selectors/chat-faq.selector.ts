import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChatFaqEntry, ChatFaqState} from '../../schemas/chat-faq.schema';
import * as fromChatFaq from '../reducers/chat-faq.reducer';

export const getRouteState = createFeatureSelector<ChatFaqState>('chatFaqs');

export const selectChatFaqState = createSelector(
    getRouteState,
    (state) => state
);

export const selectAllChatFaqs = createSelector(
    selectChatFaqState,
    fromChatFaq.selectAll
);

export const selectChatFaqLoading = createSelector(
    selectChatFaqState,
    ({ loading }) => loading
);

export const selectChatFaqSaving = createSelector(
    selectChatFaqState,
    ({ saving }) => saving
);

export const selectChatFaqErrorMessage = createSelector(
    selectChatFaqState,
    ({ errorMessage }) => errorMessage
);
