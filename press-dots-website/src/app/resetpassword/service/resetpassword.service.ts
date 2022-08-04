import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpHeaders,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  apiUrl = environment.apiUrl;
  _url = this.apiUrl + 'Account/ChangePasswordByToken';
  constructor(private _http: HttpClient) {}

  resetPasswordByToken(resetPasswordData) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = {
      headers: headers,
    };
    return this._http
      .post<any>(this._url, resetPasswordData, options)
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
