import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { WalkableEntry, WalkableState } from '../../schemas/walkable.schema';
import {
  walkableDeleted,
  walkableDeleteFailed,
  walkableDeleteRequested,
  walkableLoaded,
  walkableLoadFailed,
  walkableLoadRequested,
  walkableSaved,
  walkableSaveFailed,
  walkableSaveRequested,
  walkableUpdated,
  walkableUpdateFailed,
  walkableUpdateRequested,
} from '../actions/walkable.action';

export const adapter: EntityAdapter<WalkableEntry> =
  createEntityAdapter<WalkableEntry>({
    selectId: (entry) => entry._id,
    sortComparer: sortByCretedDate,
  });
export function sortByCretedDate(a: WalkableEntry, b: WalkableEntry): number {
  return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
}

export const initialState: WalkableState = adapter.getInitialState({
  loading: false,
  saving: false,
  walkable: undefined,
  selectedWalkableId: undefined,
  errorMessage: undefined,
});

export const WalkableReducer = createReducer(
  initialState,
  // select
  on(walkableLoadRequested, (state) => ({
    ...state,
    loading: true,
  })),
  on(walkableLoaded, (state, { entries }) => {
    return adapter.setAll(entries, {
      ...state,
      loading: false,
      errorMessage: undefined,
    });
  }),
  on(walkableSaveRequested, (state) => ({
    ...state,
    saving: true,
  })),
  on(walkableSaved, (state, { entry }) => {
    return adapter.addOne(entry, {
      ...state,
      saving: false,
      walkableAdded: entry,
      errorMessage: undefined,
    });
  }),
  // update
  on(walkableUpdateRequested, (state) => ({
    ...state,
    saving: true,
  })),
  on(walkableUpdated, (state, { entry }) => {
    return adapter.updateOne(
      {
        id: entry._id,
        changes: entry,
      },
      {
        ...state,
        saving: false,
        errorMessage: undefined,
      }
    );
  }),
  // delete
  on(walkableDeleteRequested, (state) => ({
    ...state,
    saving: true,
  })),
  on(walkableDeleted, (state, { entry }) => {
    return adapter.removeOne(entry._id, {
      ...state,
      saving: false,
      errorMessage: undefined,
    });
  }),
  // error
  on(
    walkableLoadFailed,
    walkableSaveFailed,
    walkableUpdateFailed,
    walkableDeleteFailed,
    (state, { errorMessage }) => {
      return {
        ...state,
        loading: false,
        saving: false,
        errorMessage,
        walkable: undefined,
      };
    }
  )
);

export const {
    selectAll,
} = adapter.getSelectors();

