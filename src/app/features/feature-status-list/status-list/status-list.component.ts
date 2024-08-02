import { Component, input, output } from '@angular/core';
import { StatusComponent } from '../status/status.component';
import { CommonModule } from '@angular/common';
import { StatusTask } from '../../../ngrx/status/status-kard.reducer';
import { Sprint } from '../../../ngrx/sprints/sprint.reducer';

@Component({
  selector: 'app-status-list',
  standalone: true,
  imports: [StatusComponent, CommonModule],
  templateUrl: './status-list.component.html',
  styleUrl: './status-list.component.css'
})
export class StatusListComponent {
  public statusTasks = input.required<StatusTask[]>()
  public sprints = input.required<Sprint[]>()
  public readonly newTaskEmitter = output<{title: string, statusTask: string, sprintId: number}>()
  public readonly editedStatusEmitter = output<{id: number, newTitle: string, oldTitle: string}>()

  addTask(content: {title: string, statusTask: string, sprintId: number}){
    this.newTaskEmitter.emit(content)
  }

  editeStatus(content: {id: number, newTitle: string, oldTitle: string}){
    this.editedStatusEmitter.emit(content)
  }
}
