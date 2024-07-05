import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule, JsonPipe, Location} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {StudentsService} from "../students.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatButton, MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatInput, MatInputModule} from "@angular/material/input";
import {
  MatStep,
  MatStepLabel,
  MatStepper,
  MatStepperModule,
  MatStepperNext,
  MatStepperPrevious
} from "@angular/material/stepper";

@Component({
  selector: 'app-registration-from',
  standalone: true,
  imports: [
    NgbModule,
    ReactiveFormsModule,
    JsonPipe,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatStepperModule,
    MatInputModule,
    MatInput,
    MatButton,
    MatStepperPrevious,
    MatStepperNext,
    MatStepLabel,
    MatStep,
    MatStepper,
    MatIcon,
    MatIconButton
  ],
  template: `
    <div class="container mt-5">
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

      <form [formGroup]="registrationForm" (ngSubmit)="onSubmit()">
        <mat-horizontal-stepper [linear]="true" #stepper>
          <mat-step [stepControl]="studentDetailsForm">
            <form [formGroup]="studentDetailsForm">
              <ng-template matStepLabel>Student Details</ng-template>
              <div class="mb-3 row">
                <label for="firstName" class="col-sm-3 col-form-label">First Name:</label>
                <div class="col-sm-9">
                  <input matInput type="text" id="firstName" formControlName="firstName" class="form-control"
                         [ngClass]="{ 'is-invalid': submitted && f['firstName'].errors }">
                  <div *ngIf="submitted && f['firstName'].errors" class="invalid-feedback">
                    <div *ngIf="f['firstName'].errors?.['required']">First Name is required</div>
                  </div>
                </div>
              </div>
              <div class="mb-3 row">
                <label for="lastName" class="col-sm-3 col-form-label">Last Name:</label>
                <div class="col-sm-9">
                  <input matInput type="text" id="lastName" formControlName="lastName" class="form-control"
                         [ngClass]="{ 'is-invalid': submitted && f['lastName'].errors }">
                  <div *ngIf="submitted && f['lastName'].errors" class="invalid-feedback">
                    <div *ngIf="f['lastName'].errors?.['required']">Last Name is required</div>
                  </div>
                </div>
              </div>
              <div class="mb-3 row">
                <label for="address" class="col-sm-3 col-form-label">Address:</label>
                <div class="col-sm-9">
                  <input matInput type="text" id="address" formControlName="address" class="form-control"
                         [ngClass]="{ 'is-invalid': submitted && f['address'].errors }">
                  <div *ngIf="submitted && f['address'].errors" class="invalid-feedback">
                    <div *ngIf="f['address'].errors?.['required']">Address is required</div>
                  </div>
                </div>
              </div>
              <div class="mb-3 row">
                <label for="parentPhone" class="col-sm-3 col-form-label">Parent Phone:</label>
                <div class="col-sm-9">
                  <input matInput type="tel" id="parentPhone" formControlName="parentPhone" class="form-control"
                         [ngClass]="{ 'is-invalid': submitted && f['parentPhone'].errors }">
                  <div *ngIf="submitted && f['parentPhone'].errors" class="invalid-feedback">
                    <div *ngIf="f['parentPhone'].errors?.['required']">Parent Phone is required</div>
                  </div>
                </div>
              </div>
              <div class="mb-3 row">
                <label for="parentEmail" class="col-sm-3 col-form-label">Parent Email:</label>
                <div class="col-sm-9">
                  <input matInput type="email" id="parentEmail" formControlName="parentEmail" class="form-control"
                         [ngClass]="{ 'is-invalid': submitted && f['parentEmail'].errors }">
                  <div *ngIf="submitted && f['parentEmail'].errors" class="invalid-feedback">
                    <div *ngIf="f['parentEmail'].errors?.['required']">Parent Email is required</div>
                    <div *ngIf="f['parentEmail'].errors?.['email']">Invalid email format</div>
                  </div>
                </div>
              </div>
              <div>
                <button mat-button matStepperNext>Next</button>
              </div>
            </form>
          </mat-step>
          <mat-step [stepControl]="additionalDetailsForm">
            <form [formGroup]="additionalDetailsForm">
              <ng-template matStepLabel>Additional Details</ng-template>
              <div class="mb-3 row">
                <label for="siblings" class="col-sm-3 col-form-label">Siblings at the Center:</label>
                <div class="col-sm-9">
                  <input matInput type="text" id="siblings" formControlName="siblings" class="form-control">
                </div>
              </div>
              <div class="mb-3 row">
                <label for="notes" class="col-sm-3 col-form-label">Notes (Conservatory, Football, etc.):</label>
                <div class="col-sm-9">
                  <input matInput type="text" id="notes" formControlName="notes" class="form-control">
                </div>
              </div>
              <div class="mb-3 row">
                <label for="books" class="col-sm-3 col-form-label">Books:</label>
                <div class="col-sm-9">
                  <select matNativeControl id="books" formControlName="books" class="form-select">
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>
              <div class="mb-3 row">
                <label for="payment" class="col-sm-3 col-form-label">Payment:</label>
                <div class="col-sm-9">
                  <select matNativeControl id="payment" formControlName="payment" class="form-select">
                    <option value="cash">Cash</option>
                    <option value="transfer">Transfer</option>
                    <option value="button">Button</option>
                    <option value="computer">Computer</option>
                  </select>
                </div>
              </div>
              <div class="mb-3 row">
                <label for="studentStatus" class="col-sm-3 col-form-label">Is the Student New or Old?:</label>
                <div class="col-sm-9">
                  <select matNativeControl id="studentStatus" formControlName="studentStatus" class="form-select">
                    <option value="new">New</option>
                    <option value="old">Old</option>
                  </select>
                </div>
              </div>
              <div>
                <button mat-button matStepperPrevious>Previous</button>
                <button mat-button matStepperNext>Next</button>
              </div>
            </form>
          </mat-step>
          <mat-step>
            <ng-template matStepLabel>Confirm</ng-template>
            <p>You are about to submit the registration form.</p>
            <div>
              <button mat-button matStepperPrevious>Previous</button>
              <button mat-button type="submit">Submit</button>
            </div>
          </mat-step>
        </mat-horizontal-stepper>
      </form>
    </div>
  `,
  styles: ``
})

export class RegistrationFromComponent implements OnInit {
  submitted = false;
  _location = inject(Location);
  // @ts-ignore
  protected registrationForm: FormGroup;
  protected studentDetailsForm!: FormGroup;
  protected additionalDetailsForm!: FormGroup;
  private fb = inject(FormBuilder);
  private registrationService = inject(StudentsService);
  private router = inject(Router);
  private _snackBar = inject(MatSnackBar);

  get f() {
    return this.registrationForm.controls;
  }

  ngOnInit(): void {
    this.studentDetailsForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      parentPhone: ['', Validators.required],
      parentEmail: ['', [Validators.required, Validators.email]],
    });

    this.additionalDetailsForm = this.fb.group({
      siblings: [''],
      notes: [''],
      books: ['', Validators.required],
      payment: ['', Validators.required],
      studentStatus: ['', Validators.required]
    });

    this.registrationForm = this.fb.group({
      studentDetails: this.studentDetailsForm,
      additionalDetails: this.additionalDetailsForm
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.registrationForm.invalid) return;

    const formData = {
      ...this.studentDetailsForm.value,
      ...this.additionalDetailsForm.value
    };

    this.registrationService.register(formData).subscribe({
      next: (response) => {
        console.log('Registration successful', response);

        this._snackBar.open("Registration successful :)", "close", {
          duration: 1000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        this.router.navigateByUrl('/home');
      },
      error: (error) => {
        this._snackBar.open("Something was wrong! ", "close", {
          duration: 1000,
          horizontalPosition: "start",
          verticalPosition: 'bottom',
        });
        console.error('There was an error during the registration!', error);
      }
    });
  }

  goBack() {
    this._location.back();
  }
}
