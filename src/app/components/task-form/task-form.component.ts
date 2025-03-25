import {Component, Inject} from '@angular/core';
import {FormBuilder, Validators, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MaterialModule} from '../../shared/material.module';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, NgForOf],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
  taskForm: FormGroup;

  priorities = ['High', 'Medium', 'Low'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      priority: ['', Validators.required],
      deadline: ['', Validators.required],
    });
    if (data) {
      this.taskForm.patchValue(data);
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.value);
    } else {
      this.logFormErrors();
    }
  }

  logFormErrors() {
    console.log('Form Valid:', this.taskForm.valid);
    console.log('Form Errors:', this.taskForm.errors);
    Object.keys(this.taskForm.controls).forEach(key => {
      const controlErrors = this.taskForm.get(key)?.errors;
      if (controlErrors) {
        console.log(`Control: ${key}, Errors:`, controlErrors);
      }
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
