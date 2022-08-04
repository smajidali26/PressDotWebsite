import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenManagerService } from 'src/app/shared/service/TokenManagerService';
import { createAppointmentRequest } from '../../model/appointment';
import { SaloonService } from '../../service/saloon.service';

@Component({
  selector: 'app-get-saloon-appointment',
  templateUrl: './get-saloon-appointment.component.html',
  styleUrls: ['./get-saloon-appointment.component.css']
})
export class GetSaloonAppointmentComponent implements OnInit {

  constructor(private activatedRouter: ActivatedRoute,private _saloonService : SaloonService,private router: Router,
              private tokenService: TokenManagerService) { }

  pageTitle: string = 'Book Appointment';
  saloonId: number;
  date: string;
  errorMessage: string;
  saloonAppointment: any;

  ngOnInit(): void {
    this.FillValuesFromQueryString();
    this.getSaloonAppointments(this.saloonId, this.date);
  }
  FillValuesFromQueryString() {
    this.activatedRouter.queryParams.subscribe((params) => {
      this.saloonId = params['id'];
    });
    this.activatedRouter.queryParams.subscribe((params) => {
      this.date = params['date'];
    });
  }
  getSaloonAppointments(saloonId: number, date: string) {
    
    this._saloonService.getSaloonAppointments(this.saloonId,this.date).subscribe({
      
      next: (data) => {
        this.saloonAppointment = data;
        console.log(this.saloonAppointment);
      },
      error: (err) => (this.errorMessage = err),
    });
  }
  BookAppointmentSlot(doctorId,saloonId,startHour,endHour){
    var createModel = new createAppointmentRequest();
    createModel.customerId = this.tokenService.retrieveUserId();
    createModel.doctorId = doctorId;
    createModel.saloonId = saloonId;
    createModel.date = this.date;
    createModel.startTime = startHour;
    createModel.endTime = endHour;

    let model = JSON.stringify(createModel);
    this._saloonService.CreateAppointment(model).subscribe(
      (response) => this.SuccessAppointmentCreation(),
      (error) => this.ErrorAppointmentCreation(error)
    );
    console.log(this.tokenService.retrieveUserId() +' '+ doctorId +' ' + saloonId + ' ' + this.date + ' ' + startHour +' ' + endHour)
    
  }
  SuccessAppointmentCreation(){
    alert("successfully book appointment");
    this.router.navigate(['patientdashboard']);
  }
  ErrorAppointmentCreation(error){
    alert("error");
    this.errorMessage = error;
  }

}
