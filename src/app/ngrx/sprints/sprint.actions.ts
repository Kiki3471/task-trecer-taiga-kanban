import { createAction, props } from "@ngrx/store";
import { Sprint } from "./sprint.reducer";


export const loadSprints = createAction('[Sprints Page] load Sprints');
export const loadSprintsSucces = createAction('[Sprints Page] load Sprints Succes', props<{sprints: Sprint[]}>());

export const editeSprint  = createAction('[Sprints Page] Edite Sprint', props<{id: number, title: string}>());

export const addSprint  = createAction('[Sprints Page] Add Sprint', props<{title: string}>());

export const deleteSprint = createAction('[Sprint Page] Delete Sprint', props<{id: number}>())

export const returnSprint = createAction('[Sprint Page] Return Sprint', props<{id: number}>())


