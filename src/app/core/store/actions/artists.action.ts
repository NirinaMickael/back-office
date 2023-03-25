import { createAction,props } from "@ngrx/store";
import { ArtistEntry } from "../../schemas/artists.schema";

const source = "artist";

export const artistLoadRequested = createAction(`[${source}] load requested`);

export const artistLoaded = createAction(
    `[${source}] loaded`,
    props<{ entries: ArtistEntry[] }>()
  );
  export const artistLoadFailed = createAction(
    `[${source}] load failure`,
    props<{ errorMessage: string }>()
  );
  
  // Add artist
  export const artistSaveRequested = createAction(
    `[${source}] save requested`,
    props<{ input: ArtistEntry }>()
  );
  
  export const artistSaved = createAction(
    `[${source}] saved`,
    props<{ entry: ArtistEntry }>()
  );
  
  export const artistSaveFailed = createAction(
    `[${source}] save failure`,
    props<{ errorMessage: string }>()
  );
  
  // Update artist
  export const artistUpdateRequested = createAction(
    `[${source}] update requested`,
    props<{ param: string, body: any }>()
  );
  
  export const artistUpdated = createAction(
    `[${source}] updated`,
    props<{ entry: ArtistEntry }>()
  );
  
  export const artistUpdateFailed = createAction(
    `[${source}] update failure`,
    props<{ errorMessage: string }>()
  );
  
  // Delete artist
  export const artistDeleteRequested = createAction(
    `[${source}] delete requested`,
    props<{ entry: ArtistEntry }>()
  );
  
  export const artistDeleted = createAction(
    `[${source}] deleted`,
    props<{ entry: ArtistEntry }>()
  );
  
  export const artistDeleteFailed = createAction(
    `[${source}] delete failure`,
    props<{ errorMessage: string }>()
  );