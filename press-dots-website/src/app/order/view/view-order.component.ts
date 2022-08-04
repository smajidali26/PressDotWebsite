import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenManagerService } from 'src/app/shared/service/TokenManagerService';
import { IPagedDataView } from 'src/app/shared/view/IPagedDataView';
import { OrderService } from '../service/order.service';

@Component({  
  templateUrl: './view-order.component.html',  
})
export class ViewOrderComponent implements OnInit {
  constructor(    
    private router: Router,    
   private service : OrderService,
   private tokenService : TokenManagerService
  ) {}

  ngOnInit(): void {        
   this.getOrders();
}
getOrders(){
  this.service.getOrders(0, 10,this.tokenService.retrieveUserId()).subscribe({
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
  this.getOrders();
}

nextRecord(){
  debugger;
  this.pageIndex = this.pageIndex +1;
  this.getOrders();
}
next(item) {
  debugger;
  this.pageIndex = item;
  this.getOrders();
}
isActive(item) {
  if (item == this.pageIndex) {
    return true;
  } else {
    return false;
  }
}
  pageTitle: string = 'Orders';
  orders: IPagedDataView<any>;
  errorMessage: string;
  pageSize: number;
  pageIndex: number;
}
