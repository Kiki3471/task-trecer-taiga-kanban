import { Component, inject, Input, OnInit } from '@angular/core';
import { TaskListComponent } from '../task-list/task-list.component';
import { select, Store } from '@ngrx/store';
import { selectAllTasks } from '../../../ngrx/tasks/tasks.selector';
import { CommonModule } from '@angular/common';
import { addImg, changeStatus, editeTask, editeText, loadTasks } from '../../../ngrx/tasks/tasks.actions';
import { selectAllSprints } from '../../../ngrx/sprints/sprint.selector';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-task-list-container',
  standalone: true,
  imports: [TaskListComponent, CommonModule],
  templateUrl: './task-list-container.component.html',
  styleUrl: './task-list-container.component.css'
})
export class TaskListContainerComponent implements OnInit{
  private readonly store = inject(Store)
  @Input({required: true}) statusTask!: string
  @Input({required: true}) sprintId!: number

  ngOnInit(): void {
    this.store.dispatch(loadTasks())
  }

  public tasks$ = this.store.pipe(select(selectAllTasks))

  public sprints = toSignal(this.store.pipe(select(selectAllSprints)))

  addImg(content: {id: number, img: string}){
    this.store.dispatch(addImg(content))
  }

  changeStatus(content: {status: string, id: number}){
    this.store.dispatch(changeStatus(content))
  }

  editeTask(content: {id: number, title: string}){
    this.store.dispatch(editeTask(content))
  }

  editeText(content: {id: number, text: string}){
    this.store.dispatch(editeText(content))
  }
}
