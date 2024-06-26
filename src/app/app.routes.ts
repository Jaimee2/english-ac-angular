import {Routes} from '@angular/router';
import {RegistrationFromComponent} from "./registration-from/registration-from.component";

export const routes: Routes = [
  {path: 'registration', component: RegistrationFromComponent},
  {path: '**', component: RegistrationFromComponent},
];
