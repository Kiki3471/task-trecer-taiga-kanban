import {  Pipe, PipeTransform } from '@angular/core';
import { Task } from '../../../ngrx/tasks/tasks.reducer';
import {  map, Observable } from 'rxjs';

@Pipe({
  name: 'tasksBySprint',
  standalone: true,
})
export class TasksBySprintPipe implements PipeTransform {
  transform(tasks$: Observable<Task[]>, status: string, sprintId: number): Observable<Task[]> {
    return tasks$.pipe(
        map(item => item.filter(item => item.statusTask === status && item.sprintId === sprintId))
    )
  }
}

