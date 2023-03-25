import { createAction,props } from "@ngrx/store";
import { CategoryEntry } from "../../schemas/caterogy.schema";

const source = "category";

export const categoryLoadRequested = createAction(`[${source}] load requested`);

export const categoryLoaded = createAction(
    `[${source}] loaded`,
    props<{ entries: CategoryEntry[] }>()
  );
  export const categoryLoadFailed = createAction(
    `[${source}] load failure`,
    props<{ errorMessage: string }>()
  );
  
  // Add category
  export const categorySaveRequested = createAction(
    `[${source}] save requested`,
    props<{ input: CategoryEntry }>()
  );
  
  export const categorySaved = createAction(
    `[${source}] saved`,
    props<{ entry: CategoryEntry }>()
  );
  
  export const categorySaveFailed = createAction(
    `[${source}] save failure`,
    props<{ errorMessage: string }>()
  );
  
  // Update category
  export const categoryUpdateRequested = createAction(
    `[${source}] update requested`,
    props<{ param: string, body: any }>()
  );
  
  export const categoryUpdated = createAction(
    `[${source}] updated`,
    props<{ entry: CategoryEntry }>()
  );
  
  export const categoryUpdateFailed = createAction(
    `[${source}] update failure`,
    props<{ errorMessage: string }>()
  );
  
  // Delete category
  export const categoryDeleteRequested = createAction(
    `[${source}] delete requested`,
    props<{ entry: CategoryEntry }>()
  );
  
  export const categoryDeleted = createAction(
    `[${source}] deleted`,
    props<{ entry: CategoryEntry }>()
  );
  
  export const categoryDeleteFailed = createAction(
    `[${source}] delete failure`,
    props<{ errorMessage: string }>()
  );