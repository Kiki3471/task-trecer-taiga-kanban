import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SprintListComponent } from '../sprint-list/sprint-list.component';
import { select, Store } from '@ngrx/store';
import * as sprintsSelector from '../../../ngrx/sprints/sprint.selector';
import { deleteSprint, editeSprint, loadSprints, returnSprint } from '../../../ngrx/sprints/sprint.actions';
import { findStatusTaskBySprintId, loadStatusTask } from '../../../ngrx/status/status-kard.actions';

@Component({
  selector: 'app-sprint-list-container',
  standalone: true,
  imports: [SprintListComponent],
  templateUrl: './sprint-list-container.component.html',
  styleUrl: './sprint-list-container.component.css'
})
export class SprintListContainerComponent implements OnInit{
  private readonly store = inject(Store)
  public readonly sprints$ = this.store.pipe(select(sprintsSelector.selectAllSprints))

  ngOnInit(): void {
      this.store.dispatch(loadSprints())
      this.store.dispatch(loadStatusTask())
  }

  openSprint(id: number){
    this.store.dispatch(findStatusTaskBySprintId({id: id}))
  }

  editSprint(container: {id: number, title: string}){
    this.store.dispatch(editeSprint(container))
  }

  deletSprint(id: number){
    this.store.dispatch(deleteSprint({id: id}))
  }

  returnSprint(id: number){
    this.store.dispatch(returnSprint({id: id}))
  }
}
