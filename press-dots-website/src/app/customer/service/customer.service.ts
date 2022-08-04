import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { ICustomerView } from '../model/customer';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { TokenManagerService } from 'src/app/shared/service/TokenManagerService';
import { IPagedDataView } from '../../shared/view/IPagedDataView';
import { isNull, isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl = environment.apiUrl;
  private customerUrl: string;
  private customerDeleteUrl: string;
  private getCustomerByIdUrl: string;
  private updateCustomerUrl: string;
  constructor(
    private http: HttpClient,
    private tokenManagerService: TokenManagerService
  ) {
    this.customerUrl = this.apiUrl + 'Users/GetUsers';
    this.customerDeleteUrl = this.apiUrl + 'Users/DeleteUser';
    this.getCustomerByIdUrl = this.apiUrl + 'Users/GetUserById';
    this.updateCustomerUrl = this.apiUrl + 'Users/UpdateUser';
  }

  getCustomers(pageIndex, pageSize): Observable<IPagedDataView<ICustomerView>> {
    let headers = new HttpHeaders({
      Authorization: 'bearer ' + this.tokenManagerService.retrieveToken(),
    });
    let options = {
      headers: headers,
    };

    return this.http
      .get<IPagedDataView<ICustomerView>>(
        this.customerUrl + '?pageIndex=' + pageIndex + '&pageSize=' + pageSize,
        options
      )
      .pipe(tap(), catchError(this.handleError));
  }
  DeleteUser(userId) {
    let params = new HttpParams().append('userId', userId);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.tokenManagerService.retrieveToken(),
    });
    let options = {
      headers: headers,
      params: params,
    };
    return this.http
      .delete(this.customerDeleteUrl, options)
      .pipe(catchError(this.handleError));
  }
  getCustomerById(userId){
    let headers = new HttpHeaders({
      Authorization: 'bearer ' + this.tokenManagerService.retrieveToken(),
    });
    let options = {
      headers: headers,
    };
    return this.http
      .get<any>(this.getCustomerByIdUrl + '?userId=' + userId, options)
      .pipe(catchError(this.handleError));
  }
  UpdateCustomer(customer){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.tokenManagerService.retrieveToken(),
    });
    let options = {
      headers: headers,
    };
    return this.http
      .post<any>(this.updateCustomerUrl, customer, options)
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `error message is : ${err.error.Message}`;
    }
    return throwError(errorMessage);
  }
}
