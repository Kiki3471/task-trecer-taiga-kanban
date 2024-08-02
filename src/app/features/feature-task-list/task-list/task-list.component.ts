import { Component, input, Input, output} from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { Task } from '../../../ngrx/tasks/tasks.reducer';
import { combineLatest, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TasksBySprintPipe } from '../pipes/task-by-sprint.pipe';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { Sprint } from '../../../ngrx/sprints/sprint.reducer';



@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    TaskComponent, 
    CommonModule, 
    TasksBySprintPipe,
    CdkDropList,
    CdkDrag
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  @Input({required: true}) tasks!: Observable<Task[]>
  statusTask = input.required<string>()
  sprintId = input.required<number>();
  public readonly sprints = input.required<Sprint[]>()
  public readonly addImg = output<{id: number, img: string}>()
  public readonly newTaskTitleEmutter = output<{id: number, title: string}>()
  public readonly changeStatusEmitter = output<{status: string, id: number}>()
  public readonly changeTextEmitter = output<{id: number, text: string}>()
  

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.changeStatusEmitter.emit({status: this.statusTask(), id: event.item.data.id})
      transferArrayItem(   
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  addImgF(content: {id: number, img: string}){
    this.addImg.emit(content)
  }

  editeTask(content: {id: number, title: string}){
    this.newTaskTitleEmutter.emit(content)
  }

  edeteText(content: {id: number, text: string}){
    this.changeTextEmitter.emit(content)
  }
}
