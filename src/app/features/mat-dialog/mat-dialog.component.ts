import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

interface MatData {
  title: string, 
  text: string, 
  matLabel: string, 
  status?: string, 
  id?: number,
  matText?: string,
  taskText?: string,
  imgUrl?: string
}

@Component({
  selector: 'app-mat-dialog-ine',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './mat-dialog.component.html',
  styleUrl: './mat-dialog.component.css'
})
export class MatDialogComponent {
  public data: MatData = inject(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef);
  public readonly inputName = new FormControl(this.data.title, {nonNullable: true, validators: Validators.required});



  editeSprint(){
    this.dialogRef.close(this.inputName.value)
    
  }

  closeDialog(){
    this.dialogRef.close()
  }   
}
