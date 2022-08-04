import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerListComponent } from './customer/view/customerList.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegistrationComponent } from './registration/view/registration.component';
import { SigninComponent } from './signin/view/signin.component';
import { ForgotpasswordComponent } from './forgotpassword/view/forgotpassword.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ActivateComponent } from './activate/view/activate.component';
import { TokenManagerService } from './shared/service/TokenManagerService';
import { ChangePasswordComponent } from './change-password/view/change-password.component';

import { SaloonComponent } from './saloon/view/saloon.component';
import { SaloonListComponent } from './saloon/view/saloon-list/saloon-list.component';
import { ActivePipe } from './shared/pipe/active.pipe';
import { LaboratoryComponent } from './laboratory/view/laboratory.component';
import { LaboratoryListComponent } from './laboratory/view/laboratory-list.component';
import { ResetpasswordComponent } from './resetpassword/view/resetpassword.component';
import { EditSaloonComponent } from './saloon/view/edit-saloon/edit-saloon.component';
import { DentistDashboardComponent } from './dentist-dashboard/view/dentist-dashboard.component';
import { ViewOrderComponent } from './order/view/view-order.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LocationComponent } from './location/view/location.component';
import { LoaderComponent } from './shared/view/loader.component';
import { LoaderService } from './shared/service/loader.service';
import { LoaderInterceptor } from './shared/interceptor/loader-interceptor.service';
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

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    WelcomeComponent,
    RegistrationComponent,
    SigninComponent,
    ForgotpasswordComponent,
    ConfirmEmailComponent,
    ActivateComponent,
    ChangePasswordComponent,
    SaloonComponent,
    SaloonListComponent,
    LaboratoryComponent,
    LaboratoryListComponent,
    ResetpasswordComponent,
    EditSaloonComponent,
    DentistDashboardComponent,
    ViewOrderComponent,
    ActivePipe,
    LocationComponent,
    LoaderComponent,
    LabDashboardComponent,
    AddCityComponent,
    AddCountryComponent,
    CreateAppointmentComponent,
    PatientDashboardComponent,
    EditLaboratoryComponent,
    SearchSaloonComponent,
    GetSaloonAppointmentComponent,
    BookedAppointmentComponent,
    CustomerEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
   
  ],
  providers: [TokenManagerService,
  LoaderService,{
    provide : HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi:true
  }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
