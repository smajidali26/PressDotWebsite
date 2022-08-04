import { Component, OnInit } from '@angular/core';
import { IPagedDataView } from 'src/app/shared/view/IPagedDataView';
import { TokenManagerService } from 'src/app/shared/service/TokenManagerService';
import { PatientService } from '../service/patient.service';
import { Router } from '@angular/router';
import { StateService } from 'src/app/shared/service/stateService';


@Component({  
  templateUrl: './patient-dashboard.component.html',  
})
export class PatientDashboardComponent implements OnInit {
  constructor(             
   private tokenService : TokenManagerService,  
   private service : PatientService,
   private router : Router,
   private stateService : StateService
  ) {}
  pageTitle: string = 'Appointments';
  appointments: IPagedDataView<any>;
  errorMessage: string;
  pageSize: number;
  pageIndex: number;
  states: any;

  ngOnInit(): void {        
   this.getAppointmentsUserId();
   this.getStates();
}
create(){
    this.router.navigate(['/searchsaloon']);
}
action(appointmentId,stateName){ 
  var stateId = this.getStateId(stateName);
  this.service.updateAppointmentStatus(appointmentId,stateId,'').subscribe(
    (response) => this.getAppointmentsUserId(),
    (error) => (this.errorMessage = error)
  );
  }
onSubmit() {
  debugger;
}
getAppointmentsUserId(){
  var userId = this.tokenService.retrieveUserId();
  this.service.getAppointmentsByUserId(0, 10,userId).subscribe({
    next: (result) => {
      this.appointments = result;  
      console.log(this.appointments);                  
    },
    error: (err) => (this.errorMessage = err),
  });
  
}
getArrayFromNumber(length) {
  return new Array(length);
}
previous(){
  this.pageIndex = this.pageIndex -1;
  this.getAppointmentsUserId();
}
nextRecord(){
  this.pageIndex = this.pageIndex +1;
  this.getAppointmentsUserId();
}
next(item) {
  this.pageIndex = item;
  this.getAppointmentsUserId();
}
isActive(item) {
  if (item == this.pageIndex) {
    return true;
  } else {
    return false;
  }
}
getStates(){
  this.stateService.getStates().subscribe({
    next: (state) => {
      this.states = state;
      this.states = this.states.filter(
        (item) =>
          item.stateFor == 'Appointment'
      );            
    },
    error: (err) => (this.errorMessage = err),
  });
  console.log(this.states);
}
getStateId(stateName): number{
  console.log(this.states);
  return this.states.find(x => x.value == stateName).id;
}  
}
