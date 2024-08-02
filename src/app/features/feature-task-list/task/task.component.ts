import { Component, DestroyRef, inject, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Task } from '../../../ngrx/tasks/tasks.reducer';
import { MatDialog } from '@angular/material/dialog';
import { TaskContentComponent } from '../task-content/task-content.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Sprint } from '../../../ngrx/sprints/sprint.reducer';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogEditeTaskComponent } from '../../mat-dialog-edite-task/mat-dialog-edite-task.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent{
  private readonly container = inject(MatDialog);
  public readonly addImg = output<{id: number, img: string}>()
  public readonly newTaskTitleEmutter = output<{id: number, title: string}>()
  public readonly newTaskTextEmutter = output<{id: number, text: string}>()
  public readonly sprints = input.required<Sprint[]>()
  public readonly task = input.required<Task>()
  private readonly destroyRef = inject(DestroyRef);

  openContainer(){
    this.container.open(TaskContentComponent, {
      data: {task: this.task(), sprints: this.sprints()}
    })
  }

  editeTask(){
    this.container.open(MatDialogEditeTaskComponent, {
      data: {
        title: this.task().title,
        text: 'Изменить задачу',
        matLabel: 'Название задачи',
        matText: 'Текст в задаче',
        taskText: this.task().text,
        imgUrl: this.task().imgUrl
    }
    }).afterClosed()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((container: {inputTitle: string, inputText: string, inputImg: string}) => {
      if (container) {
        this.newTaskTitleEmutter.emit({id: this.task().id, title: container.inputTitle})
        this.addImg.emit({id: this.task().id, img: container.inputImg})
        this.newTaskTextEmutter.emit({id: this.task().id, text: container.inputText})
      }
    })
  }
}
