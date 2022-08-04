import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenManagerService } from 'src/app/shared/service/TokenManagerService';
import { BookedAppointmentsService } from '../service/bookedappointments.service';
import { StateService } from 'src/app/shared/service/stateService';

@Component({
  selector: 'app-booked-appointment',
  templateUrl: './booked-appointment.component.html',
  styleUrls: ['./booked-appointment.component.css']
})
export class BookedAppointmentComponent implements OnInit {

  constructor(private tokenService : TokenManagerService, 
              private service: BookedAppointmentsService,
              private router : Router,
              private stateService : StateService) { }

  pageTitle: string = 'Pending Appointments';
  appointments:any;
  errorMessage: string;
  pageSize: number;
  pageIndex: number;
  result: any;
  ngOnInit(): void {
    this.pageIndex=0;
    this.pageSize=100;
    this.getStates();
    this.getAppointments();
    
  }
  getAppointments(){
    var userId = this.tokenService.retrieveUserId();
    this.service.getBookedAppointments(this.pageIndex, this.pageSize,userId,2).subscribe({
      next: (result) => {
        this.appointments = result.data;   
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
    this.getAppointments();
  }
  nextRecord(){
    this.pageIndex = this.pageIndex +1;
    this.getAppointments();
  }
  next(item) {
    this.pageIndex = item;
    this.getAppointments();
  }
  isActive(item) {
    if (item == this.pageIndex) {
      return true;
    } else {
      return false;
    }
  }
  
  action(appointmentId,stateName){
    if(stateName == "Approved")
    {
      if(!window.confirm("You are approving appointment?"))
      return;
    }
    else if(stateName == "Reject")
    {
      if(!window.confirm("You are rejecting appointment?"))
      return;
    }
    var stateId = this.getStateId(stateName);
  
    this.service.updateAppointmentStatus(appointmentId,stateId,'').subscribe(
      (response) => this.statusUpdated(response),
      (error) => (this.errorMessage = error)
    );
    console.log("approved click");
  }

  getStates(){
    this.stateService.getStates().subscribe({
      next: (states) => {
        this.result = states;
        this.result = this.result.filter(
          (item) =>
            item.stateFor == 'Appointment'
        );            
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  getStateId(stateName): number{
    return this.result.find((x) => x.value == stateName).id;
  }

  statusUpdated(response: any): void {
    window.location.reload();
  }
}
