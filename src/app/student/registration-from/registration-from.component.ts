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
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {provideNativeDateAdapter} from "@angular/material/core";

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
    MatIconButton,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker
  ],
  providers: [provideNativeDateAdapter()],
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

      <form (ngSubmit)="onSubmit()" [formGroup]="registrationForm">
        <mat-horizontal-stepper #stepper [linear]="true">
          <mat-step [stepControl]="studentDetailsForm">
            <form [formGroup]="studentDetailsForm">
              <ng-template matStepLabel>Student Details</ng-template>
              <div class="mb-3 row">
                <label class="col-sm-3 col-form-label" for="firstName">First Name:</label>
                <div class="col-sm-9">
                  <mat-form-field appearance="fill" class="w-75" class="w-75">
                    <mat-label>First Name</mat-label>
                    <input [ngClass]="{ 'is-invalid': submitted && f['firstName'].errors }" formControlName="firstName" id="firstName"
                           matInput>
                    <mat-error *ngIf="submitted && f['firstName'].errors?.['required']">First Name is required
                    </mat-error>
                  </mat-form-field>
                </div>
              </div>
              <div class="mb-3 row">
                <label class="col-sm-3 col-form-label" for="lastName">Last Name:</label>
                <div class="col-sm-9">
                  <mat-form-field appearance="fill" class="w-75">
                    <mat-label>Last Name</mat-label>
                    <input [ngClass]="{ 'is-invalid': submitted && f['lastName'].errors }" formControlName="lastName" id="lastName"
                           matInput>
                    <mat-error *ngIf="submitted && f['lastName'].errors?.['required']">Last Name is required</mat-error>
                  </mat-form-field>
                </div>
              </div>
              <div class="mb-3 row">
                <label class="col-sm-3 col-form-label" for="birthday">Birthday:</label>
                <div class="col-sm-9">
                  <mat-form-field appearance="fill" class="w-75">
                    <mat-label>Birthday</mat-label>
                    <input matInput [matDatepicker]="picker" id="birthday" formControlName="birthday">
                    <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                    <mat-datepicker #picker></mat-datepicker>
                    <mat-error *ngIf="submitted && f['birthday'].errors?.['required']">Birthday is required</mat-error>
                  </mat-form-field>
                </div>
              </div>
              <div class="mb-3 row">
                <label class="col-sm-3 col-form-label" for="address">Address:</label>
                <div class="col-sm-9">
                  <mat-form-field appearance="fill" class="w-75">
                    <mat-label>Address</mat-label>
                    <input [ngClass]="{ 'is-invalid': submitted && f['address'].errors }" formControlName="address" id="address"
                           matInput>
                    <mat-error *ngIf="submitted && f['address'].errors?.['required']">Address is required</mat-error>
                  </mat-form-field>
                </div>
              </div>
              <div class="mb-3 row">
                <label class="col-sm-3 col-form-label" for="parentPhone">Parent Phone:</label>
                <div class="col-sm-9">
                  <mat-form-field appearance="fill" class="w-75">
                    <mat-label>Parent Phone</mat-label>
                    <input [ngClass]="{ 'is-invalid': submitted && f['parentPhone'].errors }" formControlName="parentPhone" id="parentPhone"
                           matInput>
                    <mat-error *ngIf="submitted && f['parentPhone'].errors?.['required']">Parent Phone is required
                    </mat-error>
                  </mat-form-field>
                </div>
              </div>
              <div class="mb-3 row">
                <label class="col-sm-3 col-form-label" for="parentEmail">Parent Email:</label>
                <div class="col-sm-9">
                  <mat-form-field appearance="fill" class="w-75">
                    <mat-label>Parent Email</mat-label>
                    <input [ngClass]="{ 'is-invalid': submitted && f['parentEmail'].errors }" formControlName="parentEmail" id="parentEmail"
                           matInput>
                    <mat-error *ngIf="submitted && f['parentEmail'].errors?.['required']">Parent Email is required
                    </mat-error>
                    <mat-error *ngIf="submitted && f['parentEmail'].errors?.['email']">Invalid email format</mat-error>
                  </mat-form-field>
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
                <label class="col-sm-3 col-form-label" for="siblings">Siblings at the Center:</label>
                <div class="col-sm-9">
                  <mat-form-field appearance="fill" class="w-75">
                    <mat-label>Siblings at the Center</mat-label>
                    <input formControlName="siblings" id="siblings" matInput>
                  </mat-form-field>
                </div>
              </div>
              <div class="mb-3 row">
                <label class="col-sm-3 col-form-label" for="notes">Notes (Conservatory, Football, etc.):</label>
                <div class="col-sm-9">
                  <mat-form-field appearance="fill" class="w-75">
                    <mat-label>Notes</mat-label>
                    <input formControlName="notes" id="notes" matInput>
                  </mat-form-field>
                </div>
              </div>
              <div class="mb-3 row">
                <label class="col-sm-3 col-form-label" for="books">Books:</label>
                <div class="col-sm-9">
                  <mat-form-field appearance="fill" class="w-75">
                    <mat-label>Books</mat-label>
                    <select formControlName="books" id="books" matNativeControl>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </mat-form-field>
                </div>
              </div>
              <div class="mb-3 row">
                <label class="col-sm-3 col-form-label" for="payment">Payment:</label>
                <div class="col-sm-9">
                  <mat-form-field appearance="fill" class="w-75">
                    <mat-label>Payment</mat-label>
                    <select formControlName="payment" id="payment" matNativeControl>
                      <option value="cash">Cash</option>
                      <option value="transfer">Transfer</option>
                      <option value="button">Button</option>
                      <option value="computer">Computer</option>
                    </select>
                  </mat-form-field>
                </div>
              </div>
              <div class="mb-3 row">
                <label class="col-sm-3 col-form-label" for="studentStatus">Is the Student New or Old?:</label>
                <div class="col-sm-9">
                  <mat-form-field appearance="fill" class="w-75">
                    <mat-label>Is the Student New or Old?</mat-label>
                    <select formControlName="studentStatus" id="studentStatus" matNativeControl>
                      <option value="new">New</option>
                      <option value="old">Old</option>
                    </select>
                  </mat-form-field>
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
      firstName: ['Jaime', Validators.required],
      lastName: ['Higueras', Validators.required],
      birthday: ['', Validators.required],
      address: ['C/', Validators.required],
      parentPhone: ['3453534', Validators.required],
      parentEmail: ['jaime@gmail.com', [Validators.required, Validators.email]],
    });

    this.additionalDetailsForm = this.fb.group({
      siblings: [''],
      notes: [''],
      books: ['', Validators.required],
      payment: ['', Validators.required],
      studentStatus: ['', Validators.required],

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
    this.router.navigateByUrl('/home');
    this.registrationService.register(formData).subscribe({
      next: (response) => {
        console.log('Registration successful', response);

        this._snackBar.open("Registration successful :)", "close", {
          duration: 1000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
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
