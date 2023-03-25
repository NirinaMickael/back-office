import { EntityState } from "@ngrx/entity";
export interface WalkableEntry {
    _id: string,
    floor: number;
    objectName: string;
    createdAt: Date;
    updatedAt?: Date;
}

export interface WalkableState extends EntityState<WalkableEntry> {
    loading: boolean;
    errorMessage?: string;
    saving: boolean;
    walkable:WalkableEntry ;
    selectedWalkableId: string;
}

export interface AccountState extends EntityState<WalkableEntry> {
    loading: boolean;
    isSaving: boolean;
    listWalkables: WalkableEntry[];
    errorMessage?: string;
    walkableAdded?: WalkableEntry;
    walkable?: WalkableEntry;
}