import { createFeatureSelector, createSelector } from "@ngrx/store";
import { STATUS_KARD_REDUCER, StatusTaskState } from "./status-kard.reducer";


export const selectStatusTaskState = createFeatureSelector<StatusTaskState>(STATUS_KARD_REDUCER)

export const selectStatusTaskByScprintId = createSelector(selectStatusTaskState, (state: StatusTaskState) => state.statusKardsBySprintId)

