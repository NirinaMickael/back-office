import { EntityState } from '@ngrx/entity';

export interface AssetEntry {
    _id: string;
    filename: string;
    filepath: string;
    fileType?: string;
    description?: string;
    assetLocation?: string;
    type?: string;
    auditoriumNum?: number;
    subtitles?: { language: String, filePath: String, filename: String }[]
    rank?: number;
    createdAt: Date;
    updatedAt?: Date;
}

export interface AssetState extends EntityState<AssetEntry> {
    loading: boolean;
    listEntries: AssetEntry[];
    errorMessage?: string;
    saving: boolean;
    uploadState: any;
}
