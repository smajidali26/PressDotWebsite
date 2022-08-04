import { Component, OnInit } from '@angular/core';
import { IPagedDataView } from 'src/app/shared/view/IPagedDataView';
import { FormGroup } from '@angular/forms';
import { TokenManagerService } from 'src/app/shared/service/TokenManagerService';
import { LabOrderService } from '../service/lab-orders.service';

@Component({  
  templateUrl: './lab-dashboard.component.html',  
})
export class LabDashboardComponent implements OnInit {
  constructor(             
   private tokenService : TokenManagerService,  
   private service : LabOrderService 
  ) {}

  ngOnInit(): void {        
   this.getOrdersByLabUserId();
}
dentistForm: FormGroup;

action(appointmentId,stateName){
 
    console.log("approved click");
  }
onSubmit() {
  debugger;
}
getOrdersByLabUserId(){
  var labUserId = this.tokenService.retrieveUserId();
  this.service.getOrders(0, 10,labUserId).subscribe({
    next: (result) => {
      this.orders = result;                    
    },
    error: (err) => (this.errorMessage = err),
  });
}
getArrayFromNumber(length) {
  return new Array(length);
}
previous(){
    
  debugger;
  this.pageIndex = this.pageIndex -1;
  this.getOrdersByLabUserId();
}


nextRecord(){
  debugger;
  this.pageIndex = this.pageIndex +1;
  this.getOrdersByLabUserId();
}
next(item) {
  debugger;
  this.pageIndex = item;
  this.getOrdersByLabUserId();
}
isActive(item) {
  if (item == this.pageIndex) {
    return true;
  } else {
    return false;
  }
}
  pageTitle: string = 'Dashboard';
  orders: IPagedDataView<any>;
  errorMessage: string;
  pageSize: number;
  pageIndex: number;
}
