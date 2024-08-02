import { createAction, props } from "@ngrx/store";
import {  StatusTask } from "./status-kard.reducer";

export const loadStatusTask = createAction('[StatusKard Page] load StatusKard');
export const loadStatusTaskSucces = createAction('[StatusKard Page] load StatusKard Succes', props<{statusKards: StatusTask[]}>());

export const findStatusTaskBySprintId = createAction('[StatusKard Page] find Status Kards By Sprint Id', props<{id: number}>());

export const editeStatus = createAction('[StatusKard Page] Edite Status', props<{id: number, newTitle: string, oldTitle: string}>());