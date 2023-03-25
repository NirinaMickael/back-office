import { createAction,props } from "@ngrx/store";
import { GalleryEntry } from "../../schemas/custom.schema";

const source = "gallery";

export const galleryLoadRequested = createAction(`[${source}] load requested`);

export const galleryLoaded = createAction(
    `[${source}] loaded`,
    props<{ entries: GalleryEntry[] }>()
  );
  export const galleryLoadFailed = createAction(
    `[${source}] load failure`,
    props<{ errorMessage: string }>()
  );
  
  // Add gallery
  export const gallerySaveRequested = createAction(
    `[${source}] save requested`,
    props<{ input: GalleryEntry }>()
  );
  
  export const gallerySaved = createAction(
    `[${source}] saved`,
    props<{ entry: GalleryEntry }>()
  );
  
  export const gallerySaveFailed = createAction(
    `[${source}] save failure`,
    props<{ errorMessage: string }>()
  );
  
  // Update gallery
  export const galleryUpdateRequested = createAction(
    `[${source}] update requested`,
    props<{ param: string, body: any }>()
  );
  
  export const galleryUpdated = createAction(
    `[${source}] updated`,
    props<{ entry: GalleryEntry }>()
  );
  
  export const galleryUpdateFailed = createAction(
    `[${source}] update failure`,
    props<{ errorMessage: string }>()
  );
  
  // Delete gallery
  export const galleryDeleteRequested = createAction(
    `[${source}] delete requested`,
    props<{ entry: GalleryEntry }>()
  );
  
  export const galleryDeleted = createAction(
    `[${source}] deleted`,
    props<{ entry: GalleryEntry }>()
  );
  
  export const galleryDeleteFailed = createAction(
    `[${source}] delete failure`,
    props<{ errorMessage: string }>()
  );