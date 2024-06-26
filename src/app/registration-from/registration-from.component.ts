import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule, JsonPipe} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-registration-from',
  standalone: true,
  imports: [
    NgbModule,
    ReactiveFormsModule,
    JsonPipe,
    CommonModule
  ],
  template: `
    <div class="container mt-5">
      <form [formGroup]="registrationForm" (ngSubmit)="onSubmit()">
        <div class="mb-3 row">
          <label for="firstName" class="col-sm-3 col-form-label">First Name:</label>
          <div class="col-sm-9">
            <input type="text" id="firstName" formControlName="firstName" class="form-control"
                   [ngClass]="{ 'is-invalid': submitted && f['firstName'].errors }">
            <div *ngIf="submitted && f['firstName'].errors" class="invalid-feedback">
              <div *ngIf="f['firstName'].errors?.['required']">First Name is required</div>
            </div>
          </div>
        </div>
        <div class="mb-3 row">
          <label for="lastName" class="col-sm-3 col-form-label">Last Name:</label>
          <div class="col-sm-9">
            <input type="text" id="lastName" formControlName="lastName" class="form-control"
                   [ngClass]="{ 'is-invalid': submitted && f['lastName'].errors }">
            <div *ngIf="submitted && f['lastName'].errors" class="invalid-feedback">
              <div *ngIf="f['lastName'].errors?.['required']">Last Name is required</div>
            </div>
          </div>
        </div>
        <div class="mb-3 row">
          <label for="address" class="col-sm-3 col-form-label">Address:</label>
          <div class="col-sm-9">
            <input type="text" id="address" formControlName="address" class="form-control"
                   [ngClass]="{ 'is-invalid': submitted && f['address'].errors }">
            <div *ngIf="submitted && f['address'].errors" class="invalid-feedback">
              <div *ngIf="f['address'].errors?.['required']">Address is required</div>
            </div>
          </div>
        </div>
        <div class="mb-3 row">
          <label for="parentPhone" class="col-sm-3 col-form-label">Parent Phone:</label>
          <div class="col-sm-9">
            <input type="tel" id="parentPhone" formControlName="parentPhone" class="form-control"
                   [ngClass]="{ 'is-invalid': submitted && f['parentPhone'].errors }">
            <div *ngIf="submitted && f['parentPhone'].errors" class="invalid-feedback">
              <div *ngIf="f['parentPhone'].errors?.['required']">Parent Phone is required</div>
            </div>
          </div>
        </div>
        <div class="mb-3 row">
          <label for="parentEmail" class="col-sm-3 col-form-label">Parent Email:</label>
          <div class="col-sm-9">
            <input type="email" id="parentEmail" formControlName="parentEmail" class="form-control"
                   [ngClass]="{ 'is-invalid': submitted && f['parentEmail'].errors }">
            <div *ngIf="submitted && f['parentEmail'].errors" class="invalid-feedback">
              <div *ngIf="f['parentEmail'].errors?.['required']">Parent Email is required</div>
              <div *ngIf="f['parentEmail'].errors?.['email']">Invalid email format</div>
            </div>
          </div>
        </div>
        <div class="mb-3 row">
          <label for="siblings" class="col-sm-3 col-form-label">Siblings at the Center:</label>
          <div class="col-sm-9">
            <input type="text" id="siblings" formControlName="siblings" class="form-control">
          </div>
        </div>
        <div class="mb-3 row">
          <label for="notes" class="col-sm-3 col-form-label">Notes (Conservatory, Football, etc.):</label>
          <div class="col-sm-9">
            <input type="text" id="notes" formControlName="notes" class="form-control">
          </div>
        </div>
        <div class="mb-3 row">
          <label for="books" class="col-sm-3 col-form-label">Books:</label>
          <div class="col-sm-9">
            <select id="books" formControlName="books" class="form-select">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
        <div class="mb-3 row">
          <label for="payment" class="col-sm-3 col-form-label">Payment:</label>
          <div class="col-sm-9">
            <select id="payment" formControlName="payment" class="form-select">
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
            <select id="studentStatus" formControlName="studentStatus" class="form-select">
              <option value="new">New</option>
              <option value="old">Old</option>
            </select>
          </div>
        </div>
        <div class="mb-3 row">
          <div class="col-sm-9 offset-sm-3">
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </div>
      </form>
    </div>

  `,
  styles: ``
})
export class RegistrationFromComponent implements OnInit {
  submitted = false;
  // @ts-ignore
  protected registrationForm: FormGroup;
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      parentPhone: ['', Validators.required],
      parentEmail: ['', [Validators.required, Validators.email]],
      siblings: [''],
      notes: [''],
      books: ['yes', Validators.required],
      payment: ['cash', Validators.required],
      studentStatus: ['new', Validators.required]
    });
  }

  get f() {
    return this.registrationForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.registrationForm.invalid) {
      return;
    }
    console.log(this.registrationForm.value);
  }
}
