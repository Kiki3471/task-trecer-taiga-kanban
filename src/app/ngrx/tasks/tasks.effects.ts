import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../api/api.service';
import { map, switchMap } from 'rxjs';
import { Task } from './tasks.reducer';
import * as TasksActions from './tasks.actions';

export const loadTasks = createEffect(
    () => {
      const actions$ = inject(Actions);
      const apiSrvice = inject(ApiService);
      return actions$.pipe(
        ofType(TasksActions.loadTasks),
        switchMap(() => 
            apiSrvice.get<Task[]>('task').
            pipe(
                map((tasks: Task[]) => TasksActions.loadTasksSucces({tasks: tasks}))
            )
        )
      )
    },
    {functional: true}
)