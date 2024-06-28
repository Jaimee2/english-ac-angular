import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink
  ],
  template: `
    <div class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-md-10 text-center">
          <h1 class="display-4">Welcome to the Student Management System</h1>
          <p class="lead text-muted">Navigate through the menu to manage student registrations and view the student
            list.</p>
          <div class="mt-4">
            <a class="btn btn-primary btn-lg mr-2 m-2"
               routerLink="/registration"
            >
              Go to Registration
            </a>
            <a class="btn btn-secondary btn-lg m-2"
               routerLink="/students"
            >
              View Students
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class HomeComponent {

}
