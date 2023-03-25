import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ScoreState } from '../../schemas/score.schema';
import * as fromScore from '../reducers/score.reducer';

export const getRouteState = createFeatureSelector<ScoreState>('scores');

export const selectScoreState = createSelector(
    getRouteState,
    (state) => state
);

export const selectAllScores = createSelector(
    selectScoreState,
    fromScore.selectAll
);

export const selectScoreLoading = createSelector(
    selectScoreState,
    ({ loading }) => loading
);

export const selectScoreSaving = createSelector(
    selectScoreState,
    ({ saving }) => saving
);

export const selectScoreError = createSelector(
    selectScoreState,
    ({ errorMessage }) => errorMessage
);

export const selectScoreUploadState = createSelector(
    selectScoreState,
    ({ uploadState }) => uploadState
);

export const selectScoreById = (id) => createSelector(
    selectAllScores,
    (scores) => {
        if (scores instanceof Array) {
            return scores.find(e => e._id === id)
        } else return undefined;
    }
);

export const selectScoreWithTotal = createSelector(
    selectAllScores,
    (scores) => {
        let scoreFinal = [];
        scores.forEach((element, i) => {
            let scoreObj = {};
            const game1 = element.game_1?.score || 0
            const game2 = element.game_2?.score || 0
            const game3 = element.game_3?.score || 0
            const game4 = element.game_4?.score || 0
            let user: any = !!element.user ? (element.user.name || element.user.email) : '--';
            const total = game1 + game2 + game3 + game4;
            scoreObj = {
                ...element,
                total,
                user
            }
            scoreFinal.push(scoreObj)
        });

        return scoreFinal;
    }
)