import { Routes } from '@angular/router';
import { LoginComponent } from './components/authentication/login/login.component';
import { PasswordComponent } from './components/authentication/password/password.component';
import { DeviceFormComponent } from './components/device/device-form/device-form.component';
import { DeviceListComponent } from './components/device/device-list/device-list.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'authentication/password', component: PasswordComponent },
  { path: 'form', component: DeviceFormComponent},
  { path: 'form/:id', component: DeviceFormComponent },
  { path: 'form-list', component: DeviceListComponent}
];
