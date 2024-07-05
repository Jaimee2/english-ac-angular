import {Component, inject, OnInit} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {ActivatedRoute} from "@angular/router";
import {MatInput} from "@angular/material/input";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {StudentsService} from "../students.service";
import {Location} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {LoadingSpinnerComponent} from "../../share/loading-spinner/loading-spinner.component";
import {ConfirmDialogComponent} from "../../share/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AddClassDialogComponent} from "./add-class-dialog-component/add-class-dialog.component";

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [MatFormField, MatInput, MatLabel, MatCard, MatCardHeader, MatCardContent, MatCardTitle, MatIcon, MatIconButton, LoadingSpinnerComponent, MatButton],
  template: `

    <div class="container mt-4">

      <div class="row mb-3">
        <div class="col-3">
          <button (click)="goBack()" mat-icon-button>
            <mat-icon>arrow_back</mat-icon>
          </button>
        </div>

        <div class="col-6" style="border-bottom-style: solid">
          <div class="text-center mb-4">
            <h1 class="display-4">Student detail</h1>
            <p class="lead text-muted">Manage all students' information</p>
          </div>
        </div>

      </div>

      @if (!isLoaded) {

        <app-loading-spinner></app-loading-spinner>

      } @else {

        <div class="row">

          <div class="col-md-4 text-center">
            <img alt="Student Image" class="img-fluid rounded mb-3" src="assets/student.jpg">

            @if (student.classRoom) {
              <div class="class-schedule mt-3">
                <h1>Class: {{ student.classRoom.className }}</h1>
                <h2>Schedule: {{ student.classRoom.schedule }}</h2>
              </div>
            } @else {
              <h2>Student without class :(</h2>
              <button mat-stroked-button color="primary"
                      (click)="openAddClassDialog()"
              >
                Add class to the student
              </button>
            }
          </div>

          <div class="col-md-8">
            <mat-card>
              <mat-card-content>
                <div class="mb-3">
                  <mat-form-field class="w-100">
                    <mat-label>First Name</mat-label>
                    <input [value]="student.firstName" matInput readonly>
                  </mat-form-field>
                </div>
                <div class="mb-3">
                  <mat-form-field class="w-100">
                    <mat-label>Last Name</mat-label>
                    <input [value]="student.lastName" matInput readonly>
                  </mat-form-field>
                </div>
                <div class="mb-3">
                  <mat-form-field class="w-100">
                    <mat-label>Parent Phone</mat-label>
                    <input [value]="student.parentPhone" matInput readonly>
                  </mat-form-field>
                </div>
                <div class="mb-3">
                  <mat-form-field class="w-100">
                    <mat-label>Parent Email</mat-label>
                    <input [value]="student.parentEmail" matInput readonly>
                  </mat-form-field>
                </div>
                <div class="mb-3">
                  <mat-form-field class="w-100">
                    <mat-label>Siblings</mat-label>
                    <input [value]="student.siblings" matInput readonly>
                  </mat-form-field>
                </div>
                <div class="mb-3">
                  <mat-form-field class="w-100">
                    <mat-label>Payment</mat-label>
                    <input [value]="student.payment" matInput readonly>
                  </mat-form-field>
                </div>
                <div class="mb-3">
                  <mat-form-field class="w-100">
                    <mat-label>Student Status</mat-label>
                    <input [value]="student.studentStatus" matInput readonly>
                  </mat-form-field>
                </div>
              </mat-card-content>
              <button (click)="confirmDelete(student.id)" color="warn" mat-button>Delete</button>
            </mat-card>
          </div>
        </div>
      }

    </div>

  `,
  styles: [`

    .img-fluid {
      max-width: 100%;
      height: auto;
    }

    .rounded {
      border-radius: 50%;
    }

    .class-schedule {
      text-align: left;
    }

    .class-schedule h5 {
      margin-bottom: 0.5rem;
    }

    .class-schedule p {
      margin: 0;
    }

  `]
})
export class StudentDetailComponent implements OnInit {

  route = inject(ActivatedRoute);
  studentService = inject(StudentsService);
  _location = inject(Location);
  dialog = inject(MatDialog);

  studentId!: string;
  student!: any;
  isLoaded = false;

  ngOnInit(): void {
    this.studentId = this.route.snapshot.paramMap.get('id')!;

    this.studentService.getStudentDetail(this.studentId).subscribe(data => {
      this.student = data;
      this.isLoaded = true;
    });
    //   studentClass: 'A2', // Example class
    //   schedule: 'Mon-Fri 8:00am - 3:00pm'
  }

  goBack() {
    this._location.back();
  }

  confirmDelete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.studentService.deleteStudent(id).subscribe(() => {
        this._location.back();
      });
    });

  }

  openAddClassDialog(): void {
    const dialogRef = this.dialog.open(AddClassDialogComponent, {
      width: '300px',
      data: {studentId: this.studentId}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.studentService.addClassRoomToStudent(this.studentId, result.classRoomId).subscribe(() => {
          this.ngOnInit(); // Reload the student details
        });
      }
    });
  }

}
