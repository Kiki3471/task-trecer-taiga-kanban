import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { taskReducer } from './ngrx/tasks/tasks.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { sprintReducer } from './ngrx/sprints/sprint.reducer';
import { provideEffects } from '@ngrx/effects';
import { loadSprints } from './ngrx/sprints/sprint.actions';
import * as SprintsEffects from './ngrx/sprints/sprint.effects';
import { provideHttpClient } from '@angular/common/http';
import * as TasksEffects from './ngrx/tasks/tasks.effects';
import { statusReducer } from './ngrx/status/status-kard.reducer';
import * as StatusKardsEffects from './ngrx/status/status-kard.effects';


export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects(
      SprintsEffects,
      TasksEffects,
      StatusKardsEffects
    ),
    provideStore({
        [taskReducer.name]: taskReducer.reducer,
        [sprintReducer.name]: sprintReducer.reducer,
        [statusReducer.name]: statusReducer.reducer
    }),
    provideStoreDevtools({}),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient()
]
};
