import { Component, DestroyRef, inject, output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon'
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { addSprint } from '../../ngrx/sprints/sprint.actions';
import { SprintListContainerComponent } from '../../features/feature-sprint-list/sprint-list-container/sprint-list-container.component';
import { MatDialogComponent } from '../../features/mat-dialog/mat-dialog.component';

@Component({
  selector: 'app-saydbarom',
  standalone: true,
  imports: [
    SprintListContainerComponent,
    MatIconModule
  ],
  templateUrl: './saydbarom.component.html',
  styleUrl: './saydbarom.component.css'
})
export class SaydbaromComponent {
  private readonly dialogAdd = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly store = inject(Store)

  addSprint(){
    this.dialogAdd.open(MatDialogComponent, {
      data: {
        title: '',
        text: 'Добавить спринт',
        matLabel: 'Название спринта'
      }
    }).afterClosed()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((newSprintTitle) => {
      if (newSprintTitle) {
        this.store.dispatch(addSprint({title: newSprintTitle}))
      }
    })
  }

}
