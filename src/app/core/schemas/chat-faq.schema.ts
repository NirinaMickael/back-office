import { EntityState } from '@ngrx/entity';
import { UserEntry } from './users.schema';

export interface ChatFaqEntry {
    _id?: string;
    question: string;
    answer: string;
    users?: UserEntry[];
    createdAt: Date;
    updatedAt?: Date;
}

export interface ChatFaqState extends EntityState<ChatFaqEntry> {
    loading: boolean;
    errorMessage?: string;
    saving: boolean;
}
