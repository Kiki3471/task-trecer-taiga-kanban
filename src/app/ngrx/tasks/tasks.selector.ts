import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TASK_REDUCER, TaskState } from "./tasks.reducer";


export const selectTasksState = createFeatureSelector<TaskState>(TASK_REDUCER);

export const selectAllTasks = createSelector(selectTasksState, (state: TaskState) => state.tasks)

// export const selectAllUsers = createSelector(selectUsersState, (state: initialState) => state.users);
