import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

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
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './mat-dialog-edite-task.component.html',
  styleUrl: './mat-dialog-edite-task.component.css'
})
export class MatDialogEditeTaskComponent{
  public data: MatData = inject(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef);
  private readonly formBuilder = inject(FormBuilder);
  @ViewChild('imgConrol') imgConrol: any
  public readonly formGroup: FormGroup = this.formBuilder.group({
    inputTitle: this.formBuilder.control(this.data.title, {nonNullable: true, validators: [Validators.required]}),
    inputText: this.formBuilder.control(this.data.taskText, {nonNullable: true, validators: [Validators.required]}),
    inputImg: this.formBuilder.control(this.data.imgUrl, {nonNullable: true, validators: [Validators.required, Validators.pattern(/\.img$/)]})
  });

  editeSprint(){
    this.dialogRef.close(this.formGroup.value)
    
  }

  closeDialog(){
    this.dialogRef.close()
    console.log(this.formGroup);
    
  }
}
