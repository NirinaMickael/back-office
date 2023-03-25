import { EntityState } from '@ngrx/entity';

export interface MusicEntry {
    _id: string;
    page: string;
    filename: string;
    filepath: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface MusicState extends EntityState<MusicEntry> {
    loading: boolean;
    listEntries: MusicEntry[];
    errorMessage?: string;
    saving: boolean;
    uploadState: any;
}
