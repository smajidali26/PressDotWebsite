import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordService {
  apiUrl = environment.apiUrl;
  _url = this.apiUrl + 'Account/ForgotPassword';
  constructor(private _http: HttpClient) {}

  forgotPassword(email: string) {
    let params = new HttpParams().append('email', email);

    return this._http
      .post(this._url, null, { params })
      .pipe(catchError(this.handleError));
  }
  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code : ${err.status}, error message is : ${err.error.Message}`;
    }
    return throwError(errorMessage);
  }
}
