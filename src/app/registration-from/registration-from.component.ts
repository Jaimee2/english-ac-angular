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
    <form (ngSubmit)="onSubmit()" [formGroup]="registrationForm">
      <div>
        <label for="firstName">First Name:</label>
        <input formControlName="firstName" id="firstName" type="text">
      </div>
      <div>
        <label for="lastName">Last Name:</label>
        <input formControlName="lastName" id="lastName" type="text">
      </div>
      <div>
        <label for="address">Address:</label>
        <input formControlName="address" id="address" type="text">
      </div>
      <div>
        <label for="parentPhone">Parent Phone:</label>
        <input formControlName="parentPhone" id="parentPhone" type="tel">
      </div>
      <div>
        <label for="parentEmail">Parent Email:</label>
        <input formControlName="parentEmail" id="parentEmail" type="email">
      </div>
      <div>
        <label for="siblings">Siblings at the Center:</label>
        <input formControlName="siblings" id="siblings" type="text">
      </div>
      <div>
        <label for="notes">Notes (Conservatory, Football, etc.):</label>
        <input formControlName="notes" id="notes" type="text">
      </div>
      <div>
        <label for="books">Books:</label>
        <select formControlName="books" id="books">
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <div>
        <label for="payment">Payment:</label>
        <select formControlName="payment" id="payment">
          <option value="cash">Cash</option>
          <option value="transfer">Transfer</option>
          <option value="button">Button</option>
          <option value="computer">Computer</option>
        </select>
      </div>
      <div>
        <label for="studentStatus">Is the Student New or Old?:</label>
        <select formControlName="studentStatus" id="studentStatus">
          <option value="new">New</option>
          <option value="old">Old</option>
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
    <br>
    {{ registrationForm.value | json }}

    <button class="btn btn-danger"> button </button>
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
