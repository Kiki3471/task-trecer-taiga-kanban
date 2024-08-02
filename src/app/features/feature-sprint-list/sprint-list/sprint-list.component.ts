import { Component, input, Input, output, signal, } from '@angular/core';
import { SprintComponent } from '../sprint/sprint.component';
import { Sprint } from '../../../ngrx/sprints/sprint.reducer';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sprint-list',
  standalone: true,
  imports: [SprintComponent, CommonModule],
  templateUrl: './sprint-list.component.html',
  styleUrl: './sprint-list.component.css'
})
export class SprintListComponent {
  @Input({required: true}) sprints$!: Observable<Sprint[]>
  public sprintSignal = signal(0)
  public readonly openSprint = output<number>()
  public readonly editSprint = output<{id: number, title: string}>()
  public readonly deletSprintEmitter = output<number>()
  public readonly returnSprintEmitter = output<number>()

  openSprintF(id: number){
    this.openSprint.emit(id)
  }

  editSprintF(a: {id: number, title: string}){
    this.editSprint.emit(a)
  }

  deletSprint(id: number){
    this.deletSprintEmitter.emit(id)
  }

  returnSprint(id: number){
    this.returnSprintEmitter.emit(id)
  }
}
