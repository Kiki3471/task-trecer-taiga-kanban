import { Component, DestroyRef, inject, input, model, output } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Sprint } from '../../../ngrx/sprints/sprint.reducer';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialogComponent } from '../../mat-dialog/mat-dialog.component';

@Component({
  selector: 'app-sprint',
  standalone: true,
  imports: [
    MatCardModule, 
    MatButtonModule, 
    CommonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './sprint.component.html',
  styleUrl: './sprint.component.css'
})
export class SprintComponent {
  private readonly dialogAdd = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  public readonly openSprint = output<number>()
  public readonly editSprint = output<{id: number, title: string}>()
  public readonly deleteSprintEmitter = output<number>()
  public readonly returnSprintEmitter = output<number>()
  public readonly selected = model(0)
  public readonly sprint = input.required<Sprint>();


  showStutusKards(){
    this.openSprint.emit(this.sprint().id)
    this.selected.set(this.sprint().id)
  }

  editeSprnt(){
    this.dialogAdd.open(MatDialogComponent, {
      data: {
        title: this.sprint().title,
        text: 'Редактировать спринт',
        matLabel: 'Название спринта',
        id: this.sprint().id
      }
    }).afterClosed()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((newSprintTitle) => {
          if (newSprintTitle) {
            this.editSprint.emit({id: this.sprint().id, title: newSprintTitle})
          }
        })
  }

  deleteSprint(){
    this.deleteSprintEmitter.emit(this.sprint().id)
  }

  returnSprint(){
    this.returnSprintEmitter.emit(this.sprint().id)
  }
}
