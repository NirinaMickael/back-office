import { EntityState } from '@ngrx/entity';

// export interface AccountLogin {
//     email: string;
//     password: string;
//     fromBo: boolean;
// }

// export interface AccountLogout {
//     id: string;
// }

export interface OeuvreEntry {
    _id: string,
    name : string,
    categoryId : string,
    description: string,
    objectName:string,
    price:number;
    image :string,
    createdOn: Date;
    updatedAt?: Date;
}

export interface OeuvreState extends EntityState<OeuvreEntry> {
    loading: boolean;
    errorMessage?: string;
    saving: boolean;
    oeuvre: OeuvreEntry;
    selectedOeuvreId: string;
}
export interface AccountState extends EntityState<OeuvreEntry> {
    loading: boolean;
    isSaving: boolean;
    listEntries: OeuvreEntry[];
    errorMessage?: string;
    oeuvreAdded?: OeuvreEntry;
    oeuvre?: OeuvreEntry;
}
