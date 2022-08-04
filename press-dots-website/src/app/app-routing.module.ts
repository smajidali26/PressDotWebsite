import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer/view/customerList.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegistrationComponent } from './registration/view/registration.component';
import { SigninComponent } from './signin/view/signin.component';
import { ForgotpasswordComponent } from './forgotpassword/view/forgotpassword.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ActivateComponent } from './activate/view/activate.component';
import { ChangePasswordComponent } from './change-password/view/change-password.component';
import { SaloonComponent } from './saloon/view/saloon.component';
import { SaloonListComponent } from './saloon/view/saloon-list/saloon-list.component';
import { LaboratoryComponent } from './laboratory/view/laboratory.component';
import { LaboratoryListComponent } from './laboratory/view/laboratory-list.component';
import { ResetpasswordComponent } from './resetpassword/view/resetpassword.component';
import { EditSaloonComponent } from './saloon/view/edit-saloon/edit-saloon.component';
import { DentistDashboardComponent } from './dentist-dashboard/view/dentist-dashboard.component';
import { ViewOrderComponent } from './order/view/view-order.component';
import { LocationComponent } from './location/view/location.component';
import { LabDashboardComponent } from './lab-dashboard/view/lab-dashboard.component';
import { AddCityComponent } from './location/view/add-city.component';
import { AddCountryComponent } from './location/view/add-country.component';
import { CreateAppointmentComponent } from './patient-dashboard/view/create-appointment.component';
import { PatientDashboardComponent } from './patient-dashboard/view/patient-dashboard.component';
import { EditLaboratoryComponent } from './laboratory/view/edit-laboratory/edit-laboratory.component';
import { SearchSaloonComponent } from './saloon/view/search-saloon/search-saloon.component';
import { GetSaloonAppointmentComponent } from './saloon/view/get-saloon-appointment/get-saloon-appointment.component';
import { BookedAppointmentComponent } from './booked-appointment/view/booked-appointment.component';
import { CustomerEditComponent } from './customer/customer-edit/view/customer-edit.component';

const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  {
    path: 'customer',
    component: CustomerListComponent,
  },
  {
    path: 'customerEdit/:id',
    component: CustomerEditComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'forgotpassword',
    component: ForgotpasswordComponent,
  },
  {
    path: 'confirmEmail',
    component: ConfirmEmailComponent,
  },
  {
    path: 'Activate',
    component: ActivateComponent,
  },
  {
    path: 'changepassword',
    component: ChangePasswordComponent,
  },
  {
    path: 'saloon',
    component: SaloonComponent,
  },
  {
    path: 'editSaloon/:id',
    component: EditSaloonComponent,
  },
  {
    path: 'order',
    component: ViewOrderComponent,
  },
  {
    path: 'saloonlist',
    component: SaloonListComponent,
  },
  {
    path: 'laboratory',
    component: LaboratoryComponent,
  },
  {
    path:'editLaboratory/:id',
    component: EditLaboratoryComponent
  },
  {
    path: 'laboratorylist',
    component: LaboratoryListComponent,
  },
  {
    path: 'location',
    component: LocationComponent
  },
  {
    path: 'dentistdashboard',
    component: DentistDashboardComponent,
  },
  {
    path: 'labdashboard',
    component: LabDashboardComponent,
  },
  {
    path: 'addCity',
    component : AddCityComponent
  },
  {
    path: 'addCountry',
    component: AddCountryComponent
  },
  {
    path: 'createappointment',
    component: CreateAppointmentComponent
  },
  {
    path: 'patientdashboard',
    component: PatientDashboardComponent
  },
  {
    path: 'resetpassword',
    component: ResetpasswordComponent,
  },
  {
    path: 'searchsaloon',
    component: SearchSaloonComponent,
  },
  {
    path: 'getsaloonappointment',
    component: GetSaloonAppointmentComponent,
  },
  {
    path: 'bookedappointment',
    component: BookedAppointmentComponent,
  },
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: '**',
    component: WelcomeComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const RoutingComponents = [
  RegistrationComponent,
  SigninComponent,
  ForgotpasswordComponent,
  ConfirmEmailComponent,
];
