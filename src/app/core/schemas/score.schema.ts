import { EntityState } from '@ngrx/entity';
import { UserEntry } from './users.schema';

export interface ScoreEntry {
    _id: string;
    user: UserEntry;
    game_1: IGame;
    game_2: IGame;
    game_3: IGame;
    game_4: IGame;
    createdAt: string;
    total?: number;
}
export interface IGame {
    score: number,
    time: number,
    score_details?: {
        index: number,
        score: number
    }[]
}

export interface ScoreState extends EntityState<ScoreEntry> {
    loading: boolean;
    listEntries: ScoreEntry[];
    errorMessage?: string;
    saving: boolean;
    uploadState: any;
}