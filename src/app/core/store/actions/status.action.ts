import { createAction,props } from "@ngrx/store";
import { StatusEntry } from "../../schemas/status.schema";

const source = "status";

export const statusLoadRequested = createAction(`[${source}] load requested`);

export const statusLoaded = createAction(
    `[${source}] loaded`,
    props<{ entries: StatusEntry[] }>()
  );
  export const statusLoadFailed = createAction(
    `[${source}] load failure`,
    props<{ errorMessage: string }>()
  );
  
  // Add status
  export const statusSaveRequested = createAction(
    `[${source}] save requested`,
    props<{ input: StatusEntry }>()
  );
  
  export const statusSaved = createAction(
    `[${source}] saved`,
    props<{ entry: StatusEntry }>()
  );
  
  export const statusSaveFailed = createAction(
    `[${source}] save failure`,
    props<{ errorMessage: string }>()
  );
  
  // Update status
  export const statusUpdateRequested = createAction(
    `[${source}] update requested`,
    props<{ param: string, body: any }>()
  );
  
  export const statusUpdated = createAction(
    `[${source}] updated`,
    props<{ entry: StatusEntry }>()
  );
  
  export const statusUpdateFailed = createAction(
    `[${source}] update failure`,
    props<{ errorMessage: string }>()
  );
  
  // Delete status
  export const statusDeleteRequested = createAction(
    `[${source}] delete requested`,
    props<{ entry: StatusEntry }>()
  );
  
  export const statusDeleted = createAction(
    `[${source}] deleted`,
    props<{ entry: StatusEntry }>()
  );
  
  export const statusDeleteFailed = createAction(
    `[${source}] delete failure`,
    props<{ errorMessage: string }>()
  );