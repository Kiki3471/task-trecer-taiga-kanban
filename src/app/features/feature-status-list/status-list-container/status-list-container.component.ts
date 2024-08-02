import { Component, inject } from '@angular/core';
import { StatusListComponent } from '../status-list/status-list.component';
import { select, Store } from '@ngrx/store';
import { selectStatusTaskByScprintId } from '../../../ngrx/status/status-kard.selector';
import { CommonModule } from '@angular/common';
import { addTask } from '../../../ngrx/tasks/tasks.actions';
import { editeStatus } from '../../../ngrx/status/status-kard.actions';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectAllSprints } from '../../../ngrx/sprints/sprint.selector';

@Component({
  selector: 'app-status-list-container',
  standalone: true,
  imports: [StatusListComponent, CommonModule],
  templateUrl: './status-list-container.component.html',
  styleUrl: './status-list-container.component.css'
})
export class StatusListContainerComponent {
  private readonly store = inject(Store)

  public statusTasks$ = this.store.pipe(select(selectStatusTaskByScprintId))
  public readonly sprints = toSignal(this.store.pipe(select(selectAllSprints)));

  addTask(content: {title: string, statusTask: string, sprintId: number}){
    this.store.dispatch(addTask(content))    
  }

  editeStatus(content: {id: number, newTitle: string, oldTitle: string}){
    this.store.dispatch(editeStatus(content))
  }
}
