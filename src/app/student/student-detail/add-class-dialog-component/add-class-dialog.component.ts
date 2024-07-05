import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatOption, MatSelect} from "@angular/material/select";
import {StudentsService} from "../../students.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-add-class-dialog-component',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatDialogActions,
    MatButton,
    MatLabel,
    MatSelect,
    MatOption,
    NgForOf
  ],
  template: `
    <h1 mat-dialog-title>Add Class to Student</h1>
    <div mat-dialog-content>
      <form (ngSubmit)="onSubmit()" [formGroup]="addClassForm">
        <mat-form-field class="w-100">
          <mat-label>Classroom</mat-label>
          <mat-select formControlName="classRoomId" required>

            @for (classRoom of classRooms; track classRooms) {
              <mat-option [value]="classRoom.id">
                {{ classRoom.className }} ({{ classRoom.schedule }})
              </mat-option>
            }
          </mat-select>
        </mat-form-field>
      </form>
    </div>
    <div mat-dialog-actions>
      <button (click)="onCancel()" mat-button>Cancel</button>
      <button (click)="onSubmit()" [disabled]="addClassForm.invalid" mat-button>Add</button>
    </div>
  `,
  styles: ``
})
export class AddClassDialogComponent implements OnInit {
  addClassForm: FormGroup;
  classRooms: any[] = [];

  constructor(private fb: FormBuilder,
              private studentsService: StudentsService,
              public dialogRef: MatDialogRef<AddClassDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.addClassForm = this.fb.group({classRoomId: ['', Validators.required]});
  }

  ngOnInit(): void {
    this.studentsService.getAllClassRooms().subscribe((classRooms: any[]) => {
      this.classRooms = classRooms;
    });
  }

  onSubmit(): void {
    if (this.addClassForm.valid) {
      this.dialogRef.close(this.addClassForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
