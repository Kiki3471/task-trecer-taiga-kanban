import { createFeature, createReducer, on } from "@ngrx/store";
import * as StatusKardAvtion from "./status-kard.actions";
import { addSprint } from "../sprints/sprint.actions";

export const STATUS_KARD_REDUCER = 'statusKards';

export interface StatusTask {
    id: number,
    title: string,
    sprintId: number
}

export type StatusTaskState = {
    statusKards: StatusTask[],
    status: 'init' | 'loading' | 'loaded' | 'error';
    statusKardsBySprintId: StatusTask[]
}

const sprintInitialState: StatusTaskState = {
    statusKards: [],
    status: 'init',
    statusKardsBySprintId: []
}

export const statusReducer = createFeature({
    name: STATUS_KARD_REDUCER,
    reducer: createReducer(
        sprintInitialState,
        on(StatusKardAvtion.loadStatusTask, (state) => ({
            ...state,
            status: 'loading' as const
        })),
        on(StatusKardAvtion.loadStatusTaskSucces, ( state, {statusKards}) => ({
            ...state,
            statusKards: statusKards,
            status: 'loaded' as const
        })),
        on(StatusKardAvtion.findStatusTaskBySprintId,(state, {id}) =>({
            ...state,
            statusKardsBySprintId: state.statusKards.filter(item => item.sprintId == id),
        })),
        on(addSprint, (state) => ({
            ...state,
            statusKards: [...state.statusKards, {
                id:  Number(new Date()) + 2,
                title: 'new',
                sprintId: Number(new Date())
            },
            {
                id:  Number(new Date()) + 3,
                title: 'ready',
                sprintId: Number(new Date())
            },
            {
                id:  Number(new Date()) + 4,
                title: 'in progress',
                sprintId: Number(new Date())
            },
            {
                id: Number(new Date()) + 1,
                title: 'done',
                sprintId: Number(new Date())
            }]
        })),
        on(StatusKardAvtion.editeStatus, (state, {id, newTitle}) =>({
            ...state,
            statusKardsBySprintId: state.statusKardsBySprintId.map(kard =>  kard.id === id ? {...kard, title: newTitle} : kard)
        }))
    )
})