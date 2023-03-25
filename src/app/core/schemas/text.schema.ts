import { EntityState } from '@ngrx/entity';

export interface TextEntry {
    _id: string;
    page: string;
    title: string;
    subtitle: string;
    timer: boolean;
    timeInSecond?: number;
    sequence?: number;
    timeFormatted?: string;
    isIntro: boolean;
    timeBeforeTransition: number;
}

export interface TextState extends EntityState<TextEntry> {
    loading: boolean;
    listEntries: TextEntry[];
    errorMessage?: string;
    saving: boolean;
}
