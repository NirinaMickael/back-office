import { EntityState } from '@ngrx/entity';

export interface LogEntry {
    _id: string;
    action: string;
    domain: string;
    email: string;
    success: boolean;
    latest: string;
    detail: any;
    next: string;
    createdAt: string;
}

export interface LogState extends EntityState<LogEntry> {
    loading: boolean;
    listEntries: LogEntry[];
    errorMessage?: string;
    saving: boolean;
}
