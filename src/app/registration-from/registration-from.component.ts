import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-registration-from',
  standalone: true,
  imports: [
    NgbModule,
    ReactiveFormsModule,
    JsonPipe
  ],
  template: `
    <div class="container mt-5">
      <form [formGroup]="registrationForm" (ngSubmit)="onSubmit()">
        <div class="mb-3">
          <label for="firstName" class="form-label">First Name:</label>
          <input type="text" id="firstName" formControlName="firstName" class="form-control">
        </div>
        <div class="mb-3">
          <label for="lastName" class="form-label">Last Name:</label>
          <input type="text" id="lastName" formControlName="lastName" class="form-control">
        </div>
        <div class="mb-3">
          <label for="address" class="form-label">Address:</label>
          <input type="text" id="address" formControlName="address" class="form-control">
        </div>
        <div class="mb-3">
          <label for="parentPhone" class="form-label">Parent Phone:</label>
          <input type="tel" id="parentPhone" formControlName="parentPhone" class="form-control">
        </div>
        <div class="mb-3">
          <label for="parentEmail" class="form-label">Parent Email:</label>
          <input type="email" id="parentEmail" formControlName="parentEmail" class="form-control">
        </div>
        <div class="mb-3">
          <label for="siblings" class="form-label">Siblings at the Center:</label>
          <input type="text" id="siblings" formControlName="siblings" class="form-control">
        </div>
        <div class="mb-3">
          <label for="notes" class="form-label">Notes (Conservatory, Football, etc.):</label>
          <input type="text" id="notes" formControlName="notes" class="form-control">
        </div>
        <div class="mb-3">
          <label for="books" class="form-label">Books:</label>
          <select id="books" formControlName="books" class="form-select">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="payment" class="form-label">Payment:</label>
          <select id="payment" formControlName="payment" class="form-select">
            <option value="cash">Cash</option>
            <option value="transfer">Card</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="studentStatus" class="form-label">Is the Student New or Old?:</label>
          <select id="studentStatus" formControlName="studentStatus" class="form-select">
            <option value="new">New</option>
            <option value="old">Old</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>

    <br>
    {{ registrationForm.value | json }}

  `,
  styles: ``
})
export class RegistrationFromComponent implements OnInit {
  // @ts-ignore
  protected registrationForm: FormGroup;

  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      address: [''],
      parentPhone: [''],
      parentEmail: [''],
      siblings: [''],
      notes: [''],
      books: ['yes'],
      payment: ['cash'],
      studentStatus: ['new']
    });
  }

  onSubmit() {
    console.log(this.registrationForm.value);
  }
}
