import { createFeature, createReducer, on } from "@ngrx/store";
import * as SprintsActions from "./sprint.actions";
import { filter } from "rxjs";
// import { creatNewUser, deleteUser, setAllUsersFromLocalStorage, getAllUsersSuccess, updateUser } from "./user.actions";
// import { User, initialState } from "../interfaces/user.interface";
// import { UserLocalService } from "../services/users.local.service";

export const SPRINT_REDUCER = 'sprint';

export interface Sprint {
    id: number,
    title: string,
    active: boolean
}

export type sprintState = {
    sprints: Sprint[],
    status: 'init' | 'loading' | 'loaded' | 'error',
}

const sprintInitialState: sprintState = {
    sprints: [],
    status: 'init',
}

export const sprintReducer = createFeature({
    name: SPRINT_REDUCER,
    reducer: createReducer(
        sprintInitialState,
        on(SprintsActions.loadSprints, (state) => ({
            ...state,
            status: 'loading' as const
        })),
        on(SprintsActions.loadSprintsSucces, ( state, {sprints}) => ({
            sprints: sprints,
            status: 'loaded' as const
        })),
        on(SprintsActions.editeSprint, (state, {id, title}) => ({
            ...state,
            sprints: state.sprints.map(sprint => {
                return sprint.id == id ? {...sprint, title: title} : sprint
            })
        })),
        on(SprintsActions.addSprint, (state, {title}) =>({
            ...state,
            sprints: [...state.sprints, {
                active: true,
                id: Number(new Date()), 
                title: title
            }]
        })),
        on(SprintsActions.deleteSprint, (state, {id}) => ({
            ...state,
            sprints: state.sprints.map(sprint => {
                return sprint.id == id ? {...sprint, active: false} : sprint
            })
        })),
        on(SprintsActions.returnSprint, (state, {id}) => ({
            ...state,
            sprints: state.sprints.map(sprint => {
                return sprint.id == id ? {...sprint, active: true} : sprint
            })

        }))
    )
})