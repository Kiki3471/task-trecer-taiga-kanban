import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../../../ngrx/tasks/tasks.reducer';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Sprint } from '../../../ngrx/sprints/sprint.reducer';

@Component({
  selector: 'app-task-content',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './task-content.component.html',
  styleUrl: './task-content.component.css'
})
export class TaskContentComponent{
  public data: {task: Task, sprints: Sprint[]} = inject(MAT_DIALOG_DATA);
}
