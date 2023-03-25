import { createAction,props } from "@ngrx/store";
import { WalkableEntry } from "../../schemas/walkable.schema";

const source = "walkable";

export const walkableLoadRequested = createAction(`[${source}]  load requested`);

export const walkableLoaded = createAction(
    `[${source}] loaded`,
    props<{entries:WalkableEntry[]}>()
);
export const walkableLoadFailed = createAction(
    `[${source}] load failure`,
    props<{ errorMessage: string }>()
  );

// add Walkable zone

export const walkableSaveRequested = createAction(
    `[${source}] save requested `,
    props<{input : WalkableEntry}>()
);

export const walkableSaved = createAction(
    `[${source}] saved`,
    props<{entry : WalkableEntry}>()
);

export const walkableSaveFailed = createAction(
    `[${source}] save failure`,
    props<{ errorMessage: string }>()
  );
  
  // Update walkable
  export const walkableUpdateRequested = createAction(
    `[${source}] update requested`,
    props<{ param: string, body: any }>()
  );
  
  export const walkableUpdated = createAction(
    `[${source}] updated`,
    props<{ entry: WalkableEntry }>()
  );
  
  export const walkableUpdateFailed = createAction(
    `[${source}] update failure`,
    props<{ errorMessage: string }>()
  );
  
  // Delete walkable
  export const walkableDeleteRequested = createAction(
    `[${source}] delete requested`,
    props<{ entry: WalkableEntry }>()
  );
  
  export const walkableDeleted = createAction(
    `[${source}] deleted`,
    props<{ entry: WalkableEntry }>()
  );
  
  export const walkableDeleteFailed = createAction(
    `[${source}] delete failure`,
    props<{ errorMessage: string }>()
  );