import { createAction, props } from "@ngrx/store";
import { Task } from "./tasks.reducer";


export const loadTasks = createAction('[Tasks Page] load Tasks');
export const loadTasksSucces = createAction('[Tasks Page] load Tasks Succes', props<{tasks: Task[]}>());

export const changeStatus = createAction('[Tasks Page] change Status', props<{status: string, id: number}>());

export const addTask = createAction('[Tasks Page] Add Task', props<{title: string, sprintId: number, statusTask: string}>());

export const addImg = createAction('[Tasks Page] Add Img', props<{img: string, id: number}>());

export const editeTask = createAction('[Tasks Page] Edite Task', props<{id: number, title: string}>());

export const editeText = createAction('[Tasks Page] Edite Text', props<{id: number, text: string}>());



