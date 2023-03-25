import { EntityState } from '@ngrx/entity';
export interface CategoryEntry {
    _id: string,
    name:string,
    description:string,
    createdAt: Date;
    updatedAt?: Date;
}

export interface CategoryState extends EntityState<CategoryEntry> {
    loading: boolean;
    errorMessage?: string;
    saving: boolean;
    category: CategoryEntry;
    selectedCategoryId: string;
}
export interface AccountState extends EntityState<CategoryEntry> {
    loading: boolean;
    isSaving: boolean;
    listEntries: CategoryEntry[];
    errorMessage?: string;
    artistAdded?: CategoryEntry;
    category?: CategoryEntry;
}
