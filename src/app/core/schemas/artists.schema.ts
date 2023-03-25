import { EntityState } from '@ngrx/entity';
import { StatusEntry } from './status.schema';
export interface ArtistEntry {
    _id: string,
    artistName : string,
    email: string,
    phone : number,
    address: string,
    website:string,
    biography:string,
    image: string,
    images :string[],
    status ?: StatusEntry
    createdAt: Date;
    updatedAt?: Date;
    galleryMaterials: string[];
    gallery: number;
}

export interface ArtistState extends EntityState<ArtistEntry> {
    loading: boolean;
    errorMessage?: string;
    saving: boolean;
    artist: ArtistEntry;
    selectedArtistId: string;
}
export interface AccountState extends EntityState<ArtistEntry> {
    loading: boolean;
    isSaving: boolean;
    listEntries: ArtistEntry[];
    errorMessage?: string;
    artistAdded?: ArtistEntry;
    artist?: ArtistEntry;
}
