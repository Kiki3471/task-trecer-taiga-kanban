import { Component, DestroyRef, inject, input, Input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { StatusTask } from '../../../ngrx/status/status-kard.reducer';
import { TaskListContainerComponent } from '../../feature-task-list/task-list-container/task-list-container.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Sprint } from '../../../ngrx/sprints/sprint.reducer';
import { MatDialogComponent } from '../../mat-dialog/mat-dialog.component';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [
    MatCardModule, 
    MatButtonModule, 
    TaskListContainerComponent,
    MatIconModule
  ],
  templateUrl: './status.component.html',
  styleUrl: './status.component.css'
})
export class StatusComponent {
  private readonly dialogAdd = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  public readonly statusTask = input.required<StatusTask>();
  public readonly sprints = input.required<Sprint[]>()
  public readonly newTaskEmitter = output<{title: string, statusTask: string, sprintId: number}>();
  public readonly editedStatusEmitter = output<{id: number, newTitle: string, oldTitle: string}>();

  addTask(){
    this.dialogAdd.open(MatDialogComponent, {
      data: {
        title: '',
        text: 'Добавить задачу',
        matLabel: 'Название задачи',
        status: this.statusTask().title,
        id: this.statusTask().id
      }
    }).afterClosed()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((newStatusTitle) => {
      if (newStatusTitle) {
        this.newTaskEmitter.emit({title: newStatusTitle, statusTask: this.statusTask().title, sprintId: this.statusTask().sprintId})         
      }
    })
  }

  editeStatus(){
    this.dialogAdd.open(MatDialogComponent, {
      data: {
        title: this.statusTask().title,
        text: 'Изменить название статуса',
        matLabel: 'Название статуса'
      }
    }).afterClosed()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((newStatusTitle) => {
      if (newStatusTitle) {
        this.editedStatusEmitter.emit({id: this.statusTask().id, newTitle: newStatusTitle, oldTitle: this.statusTask().title})     
      }
    })

  }
}
