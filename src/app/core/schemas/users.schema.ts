import { EntityState } from '@ngrx/entity';

export interface AccountLogin {
    email: string;
    password: string;
    fromBo: boolean;
}

export interface AccountLogout {
    id: string;
}

export interface UserEntry {
    _id: string,
    name: string,
    email: string,
    password: string,
    role: string,
    canChat?: boolean,
    resetPasswordToken: string;
    resetPasswordExpire: Date;
    createdAt: Date;
    updatedAt?: Date;
}

export interface UserState extends EntityState<UserEntry> {
    loading: boolean;
    errorMessage?: string;
    saving: boolean;
    account: UserEntry;
    selectedAccountId: string;
}

export interface AccountState extends EntityState<UserEntry> {
    loading: boolean;
    isSaving: boolean;
    listEntries: UserEntry[];
    errorMessage?: string;
    userAdded?: UserEntry;
    user?: UserEntry;
}
