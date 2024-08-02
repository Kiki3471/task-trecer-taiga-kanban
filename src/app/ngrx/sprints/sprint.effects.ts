import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../api/api.service';
import * as SprintsActions from './sprint.actions';
import { Sprint } from './sprint.reducer';
import { map, switchMap } from 'rxjs';

export const loadSprintsee = createEffect(
    () => {
      const actions$ = inject(Actions);
      const apiSrvice = inject(ApiService);
      return actions$.pipe(
        ofType(SprintsActions.loadSprints),
        switchMap(() => 
            apiSrvice.get<Sprint[]>('sprint').
            pipe(
                map((sprints: Sprint[]) => SprintsActions.loadSprintsSucces({sprints: sprints}))
            )
        )
      )
    },
    {functional: true}
)