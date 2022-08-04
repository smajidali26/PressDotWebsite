import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IPagedDataView } from 'src/app/shared/view/IPagedDataView';
import { CreateOrderRequest} from '../model/patient';
import { PatientService } from '../service/patient.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TokenManagerService } from 'src/app/shared/service/TokenManagerService';
import { StateService } from 'src/app/shared/service/stateService';

@Component({  
  templateUrl: './dentist-dashboard.component.html',  
})
export class DentistDashboardComponent implements OnInit {
  constructor(       
   private service : PatientService,
   private modalService: NgbModal,
   private tokenService : TokenManagerService,
   private stateService : StateService
  ) {}

  ngOnInit(): void {        
   this.getAppointments();
   this.getStates();
}
dentistForm: FormGroup;
get orderDescription() {
  return this.dentistForm.get('orderDescription');
}

onSubmit() {
  
}
getAppointments(){
  var doctorId = this.tokenService.retrieveUserId();
  this.service.getPatients(0, 10,doctorId).subscribe({
    next: (result) => {
      this.patients = result;                    
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
result: any;
closeResult: string;
IsApproved : boolean = false;
patientName : string;
saloonName : string;
symptoms : string;
order(content,appointmentId,patientName,saloonName,symptoms){
  this.patientName = patientName;
  this.saloonName = saloonName;
  this.symptoms = symptoms;
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
    this.createOrder(appointmentId);
   
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    console.log(this.closeResult);
    
  });
  }
  createOrder(appointmentId){
    var request = this.getOrderCreateRequest(appointmentId);
    this.service.createOrder(request).subscribe(
      (response) => console.log(response),
      (error) => (this.errorMessage = error));
  }
  description : string;
  private getDismissReason(reason: any): string {
   
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  getOrderCreateRequest(appointmentId): CreateOrderRequest {
    var request = new CreateOrderRequest();
    request.appointmentId = appointmentId;
    request.Description = this.description;   
    return request;
  }
  statusUpdated(response: any): void {
    window.location.reload();
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
  pageTitle: string = 'Dashboard';
  patients: IPagedDataView<any>;
  errorMessage: string;
  pageSize: number;
  pageIndex: number;
}
