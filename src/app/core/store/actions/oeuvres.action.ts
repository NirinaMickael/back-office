import { createAction,props } from "@ngrx/store";
import { OeuvreEntry } from "../../schemas/oeuvre.schema";

const source = "oeuvre";

export const oeuvreLoadRequested = createAction(`[${source}] load requested`);

export const oeuvreLoaded = createAction(
    `[${source}] loaded`,
    props<{ entries: OeuvreEntry[] }>()
  );
  export const oeuvreLoadFailed = createAction(
    `[${source}] load failure`,
    props<{ errorMessage: string }>()
  );
  
  // Add oeuvre
  export const oeuvreSaveRequested = createAction(
    `[${source}] save requested`,
    props<{ input: OeuvreEntry }>()
  );
  
  export const oeuvreSaved = createAction(
    `[${source}] saved`,
    props<{ entry: OeuvreEntry }>()
  );
  
  export const oeuvreSaveFailed = createAction(
    `[${source}] save failure`,
    props<{ errorMessage: string }>()
  );
  
  // Update oeuvre
  export const oeuvreUpdateRequested = createAction(
    `[${source}] update requested`,
    props<{ param: string, body: any }>()
  );
  
  export const oeuvreUpdated = createAction(
    `[${source}] updated`,
    props<{ entry: OeuvreEntry }>()
  );
  
  export const oeuvreUpdateFailed = createAction(
    `[${source}] update failure`,
    props<{ errorMessage: string }>()
  );
  
  // Delete oeuvre
  export const oeuvreDeleteRequested = createAction(
    `[${source}] delete requested`,
    props<{ entry: OeuvreEntry }>()
  );
  
  export const oeuvreDeleted = createAction(
    `[${source}] deleted`,
    props<{ entry: OeuvreEntry }>()
  );
  
  export const oeuvreDeleteFailed = createAction(
    `[${source}] delete failure`,
    props<{ errorMessage: string }>()
  );