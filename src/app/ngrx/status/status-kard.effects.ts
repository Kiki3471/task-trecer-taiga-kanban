import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../api/api.service';
import * as StatusKardsActions from './status-kard.actions';
import { map, switchMap } from 'rxjs';
import { StatusTask } from './status-kard.reducer';

export const loadStatusKardsee = createEffect(
    () => {
      const actions$ = inject(Actions);
      const apiSrvice = inject(ApiService);
      return actions$.pipe(
        ofType(StatusKardsActions.loadStatusTask),
        switchMap(() => 
            apiSrvice.get<StatusTask[]>('status').
            pipe(
                map((statusKards: StatusTask[]) => StatusKardsActions.loadStatusTaskSucces({statusKards: statusKards}))
            )
        )
      )
    },
    {functional: true}
)