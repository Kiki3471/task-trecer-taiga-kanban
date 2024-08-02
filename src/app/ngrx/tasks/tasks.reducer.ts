import { createFeature, createReducer, on } from "@ngrx/store";
import * as tasksAction from "./tasks.actions";
import { addSprint } from "../sprints/sprint.actions";
import { editeStatus } from "../status/status-kard.actions";
import { toArray } from "rxjs";

export const TASK_REDUCER = 'task';

export interface Task {
    id: number,
    title: string,
    sprintId: number,
    statusTask: string,
    imgUrl: string,
    text: string
}

export interface TaskState {
    tasks: Task[],
    status: 'init' | 'loading' | 'loaded' | 'error',
}

const taskInitialState: TaskState = {
    tasks: [],
    status: 'init'
}

export const taskReducer = createFeature({
    name: TASK_REDUCER,
    reducer: createReducer(
        taskInitialState,
        on(tasksAction.loadTasks, (state) => ({
            ...state,
            status: 'loading' as const
        })),
        on(tasksAction.loadTasksSucces, (state, {tasks}) => ({
            tasks: tasks,
            status: 'loaded' as const
        })),
        on(tasksAction.changeStatus, (state, { id, status}) => ({
            ...state,
            tasks: state.tasks.map(task => task.id === id ? {...task, statusTask: status} : task)
        })),
        on(editeStatus, (state, {newTitle, oldTitle}) => ({
            ...state,
            tasks: state.tasks.map(task =>  task.statusTask === oldTitle ? {...task, statusTask: newTitle} : task)
        })),
        on(tasksAction.addTask, (state, {title, sprintId, statusTask}) => ({
            ...state,
            tasks: [...state.tasks, {
                id: Number(new Date()),
                title: title,
                sprintId: sprintId,
                statusTask: statusTask,
                imgUrl: '',
                text: ''
            }]
        })),
        on(tasksAction.addImg, (state, {img, id}) => ({
            ...state,
            tasks: state.tasks.map(task => task.id == id ? {...task, imgUrl: img} : task)
        })),
        on(tasksAction.editeTask, (state, {id, title}) => ({
            ...state,
            tasks: state.tasks.map(task => task.id == id ? {...task, title: title} : task)
        })),
        on(tasksAction.editeText, (state, {id, text}) => ({
            ...state,
            tasks: state.tasks.map(task => task.id == id ? {...task, text: text} : task)
        }))
    )
})