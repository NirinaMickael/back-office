import { EntityState } from '@ngrx/entity';

export interface SectionEntry {
    _id?: string;
    number: String;
    title: String;
    image: String;
    contents?: [{
        title: String;
        image: String;
        subtitles?: [{
            title: String;
            image: String;
            description: String;
            percentage: Number;
        }]
    }];
    deleted?: Boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface SectionState extends EntityState<SectionEntry> {
    loading: boolean;
    listEntries: SectionEntry[];
    errorMessage?: string;
    saving: boolean;
}
