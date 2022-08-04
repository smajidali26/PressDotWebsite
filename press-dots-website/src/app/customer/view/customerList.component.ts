import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { ICustomerView } from '../model/customer';
import { Router, ActivatedRoute } from '@angular/router';
import { IPagedDataView } from 'src/app/shared/view/IPagedDataView';

@Component({
  selector: 'app-customer',
  templateUrl: './customerList.component.html',
  styleUrls: ['./customerList.component.css'],
})
export class CustomerListComponent implements OnInit {
  constructor(
    private customerService: CustomerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    var index =
      this.activatedRoute.snapshot.queryParamMap.get('pageIndex') ?? '0';
    var size =
      this.activatedRoute.snapshot.queryParamMap.get('pageSize') ?? '10';
    this.pageIndex = parseInt(index);
    this.pageSize = parseInt(size);
    this.getCustomers();
  }
  previous() {
    debugger;
    this.pageIndex = this.pageIndex - 1;
    this.getCustomers();
  }

  private getCustomers() {
    this.customerService.getCustomers(this.pageIndex, this.pageSize).subscribe({
      next: (customers) => {
        this.result = customers;
        this.customers = customers.data;
        this.filteredCustomers = customers.data;
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  nextRecord() {
    debugger;
    this.pageIndex = this.pageIndex + 1;
    this.getCustomers();
  }
  next(item) {
    debugger;
    this.pageIndex = item;
    this.getCustomers();
  }
  isActive(item) {
    if (item == this.pageIndex) {
      return true;
    } else {
      return false;
    }
  }

  getArrayFromNumber(length) {
    return new Array(length);
  }
  pageTitle: string = 'Users';
  customers: ICustomerView[];
  result: IPagedDataView<ICustomerView>;
  filteredCustomers: ICustomerView[];
  errorMessage: string;
  _listFilter: string;
  pageSize: number;
  pageIndex: number;

  addUser() {
    this.router.navigate(['/registration']);
  }
  DeleteUser(id) {
    this.customerService.DeleteUser(id).subscribe(
      (response) => this.getCustomers(),
      (error) => (this.errorMessage = error)
    );
  }
}
