import { EntityState } from '@ngrx/entity';
export interface StatusEntry {
    _id: string,
    libelle:string,
    color:string,
    createdAt: Date;
    updatedAt?: Date;
}

export interface StatusState extends EntityState<StatusEntry> {
    loading: boolean;
    errorMessage?: string;
    saving: boolean;
    status: StatusEntry;
    selectedStatusId: string;
}
export interface AccountState extends EntityState<StatusEntry> {
    loading: boolean;
    isSaving: boolean;
    listEntries: StatusEntry[];
    errorMessage?: string;
    statusAdded?: StatusEntry;
    status?: StatusEntry;
}
