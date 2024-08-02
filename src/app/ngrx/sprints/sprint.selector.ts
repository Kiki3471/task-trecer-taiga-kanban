import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SPRINT_REDUCER, sprintState } from "./sprint.reducer";


export const selectSprintsState = createFeatureSelector<sprintState>(SPRINT_REDUCER)

export const selectAllSprints = createSelector(selectSprintsState, (state: sprintState) => state.sprints)
// export const selectSprintIsActibe = createSelector(selectSprintsState, (state: sprintState) => state.sprints)
