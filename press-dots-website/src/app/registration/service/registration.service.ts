import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { IRoles } from '../model/role';
import { environment } from '../../../environments/environment';
  
@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  apiUrl = environment.apiUrl;
  _url = this.apiUrl + 'Account/Register';
  roleUrl = this.apiUrl + 'Account/GetRoles';
  constructor(private _http: HttpClient) {}


  getRoles(): Observable<IRoles[]> {
    return this._http.get<IRoles[]>(this.roleUrl).pipe(
      tap((data) => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  register(userData) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = {
      headers: headers,
    };
    return this._http
      .post<any>(this._url, userData, options)
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
