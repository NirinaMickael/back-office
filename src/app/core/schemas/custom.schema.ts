import { EntityState } from "@ngrx/entity";
import { ArtistEntry } from "./artists.schema";
import { UserEntry } from "./users.schema";

export interface galleryTexture{
    image : string,
    repeatX:number,
    repeatY : number
}
export interface GalleryEntry {
    _id: string,
    name:string,
    GalleryTexture : GalleryEntry[],
    artist : ArtistEntry,
    artistNameColor : string,
    defaultTexture : galleryTexture,
    createdAt: Date;
    updatedAt?: Date;
}
export interface  GalleryState extends EntityState<GalleryEntry>{
    loading: boolean;
    errorMessage?: string;
    saving: boolean;
    gallery: GalleryEntry;
    selectedGalleryId: string;
}

export interface AccountState extends EntityState<GalleryEntry> {
    loading: boolean;
    isSaving: boolean;
    listEntries: GalleryEntry[];
    errorMessage?: string;
    galleryAdded?: GalleryEntry
    gallery?: GalleryEntry;
}
