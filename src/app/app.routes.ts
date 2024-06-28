import {Routes} from '@angular/router';
import {RegistrationFromComponent} from "./student/registration-from/registration-from.component";
import {StudentListComponent} from "./student/student-list/student-list.component";

export const routes: Routes = [
  {
    path: 'registration',
    component: RegistrationFromComponent
  },
  {
    path: 'students',
    component: StudentListComponent
  },
  {
    path: '**',
    redirectTo: 'registration'
  }
];
