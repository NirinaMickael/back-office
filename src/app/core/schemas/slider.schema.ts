import { EntityState } from '@ngrx/entity';

export interface SliderEntry {
    _id: string;
    type: string;
    filenames: [
        {
            index: Number,
            name: String,
            selected?: boolean
        }
    ];
}

export interface SliderState extends EntityState<SliderEntry> {
    loading: boolean;
    listEntries: SliderEntry[];
    errorMessage?: string;
    saving: boolean;
}
