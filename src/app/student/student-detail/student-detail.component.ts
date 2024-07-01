import {Component, inject, OnInit} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {ActivatedRoute} from "@angular/router";
import {MatInput} from "@angular/material/input";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
  ],
  template: `

    <div class="container mt-4">

      <div class="row">
        <div class="col-md-4 text-center">
          <img alt="Student Image" class="img-fluid rounded mb-3" src="assets/student.jpg">
          <div class="class-schedule mt-3">
            <h1>Class: {{ student.studentClass }}</h1>
            <h2>Schedule: {{ student.schedule }}</h2>
          </div>
        </div>

        <div class="col-md-8">
          <mat-card>
            <mat-card-header>
              <mat-card-title>Student Detail</mat-card-title>
            </mat-card-header>
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
          </mat-card>
        </div>
      </div>
    </div>


  `,
  styles: [`
    .student-detail {
      max-width: 800px;
      margin: auto;
    }

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
  studentId!: string;
  student!: any;

  ngOnInit(): void {
    this.studentId = this.route.snapshot.paramMap.get('id')!;

    this.student = {
      id: '1',
      firstName: 'Jaime',
      lastName: 'Higueras',
      parentPhone: '5989899',
      parentEmail: 'jaime@Gmail.com',
      siblings: 'No',
      payment: 'cash',
      studentStatus: 'new',
      imageUrl: '',
      studentClass: 'A2', // Example class
      schedule: 'Mon-Fri 8:00am - 3:00pm' // Example schedule
    };
  }


}
