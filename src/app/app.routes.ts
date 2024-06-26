import {Routes} from '@angular/router';
import {RegistrationFromComponent} from "./student/registration-from/registration-from.component";
import {StudentListComponent} from "./student/student-list/student-list.component";
import {HomeComponent} from "./home/home/home.component";
import {StudentDetailComponent} from "./student/student-detail/student-detail.component";

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'registration',
    component: RegistrationFromComponent
  },
  {
    path: 'students',
    component: StudentListComponent
  },
  {
    path: 'students/:id',
    component: StudentDetailComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
