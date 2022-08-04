import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TokenManagerService } from 'src/app/shared/service/TokenManagerService';
import { ICountry } from '../model/country';
import { ICity } from '../model/city';
import { ISaloonView } from '../model/saloonView';
import { IPagedDataView } from 'src/app/shared/view/IPagedDataView';
import { saloon } from '../model/saloon';
import { createAppointmentRequest } from '../model/appointment';

@Injectable({
  providedIn: 'root',
})
export class SaloonService {
  apiUrl = environment.apiUrl;
  _countryUrl = this.apiUrl + 'Location/GetParentLocations';
  _cityUrl = this.apiUrl + 'Location/GetLocationsByParentId';
  _saloonUrl = this.apiUrl + 'Saloon/Create';
  _updateSaloonUrl = this.apiUrl + 'Saloon/UpdateSaloon';
  _gerSaloonUrl = this.apiUrl + 'Saloon/GetSaloons';
  _getSaloonByIdUrl = this.apiUrl + 'Saloon/Get';
  _getDaysUrl = this.apiUrl + 'CommonFunctions/GetDays';
  _getDentistsUrl = this.apiUrl + 'Users/GetUserRolesByRoleIds';
  _getLaboratriesUrl = this.apiUrl + 'Laboratory/GetAllLaboratories';
  _associateDentistWithSaloon =
    this.apiUrl + 'SaloonEmployee/ScheduleSaloonEmployee';
  _associateLaboratoryWithSaloon =
    this.apiUrl + 'Saloon/ChangeSaloonDefaultLaboratory';
  _getAssociatedLabortoryBySaloonId =
    this.apiUrl + 'Saloon/GetLaboratoriesBySaloonId';
  _deleteAssociatedLaboratorySaloonUrl =
    this.apiUrl + 'Saloon/DeleteSaloonLaboratory';
  _getAssociatedDentistsWithSaloonUrl =
    this.apiUrl + 'SaloonEmployee/GetSaloonEmployeesBySaloonId';
  _deleteAssociatedDentistWithSaloonUrl =
    this.apiUrl + 'SaloonEmployee/DeleteSaloonEmployeeSchedule';
  _deleteSaloonUrl = this.apiUrl + 'Saloon/DeleteSaloon';
  _searchSaloonByLocationIdUrl = this.apiUrl + 'Saloon/GetSaloonsByLocationId';
   _getSaloonAppointmentsUrl = this.apiUrl + 'Saloon/GetSaloonAppointments';
   _createAppointmentUrl = this.apiUrl + 'Appointment/CreateAppointment';
   _getAssociatedSaloonAdmins = this.apiUrl + 'SaloonEmployee/GetSaloonAdministratorsBySaloonId';
   _deleteSaloonEmployee = this.apiUrl + 'SaloonEmployee/DeleteSaloonEmployee';

  constructor(
    private _http: HttpClient,
    private tokenManagerService: TokenManagerService
  ) {}

  getCountries(): Observable<ICountry[]> {
    let headers = new HttpHeaders({
      Authorization: 'bearer ' + this.tokenManagerService.retrieveToken(),
    });
    let options = {
      headers: headers,
    };
    return this._http.get<ICountry[]>(this._countryUrl, options).pipe(
      //tap((data) => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
  getCities(countryId): Observable<ICity[]> {
    console.log(this.tokenManagerService.retrieveToken());
    let headers = new HttpHeaders({
      Authorization: 'bearer ' + this.tokenManagerService.retrieveToken(),
    });
    let options = {
      headers: headers,
    };
    return this._http
      .get<ICity[]>(this._cityUrl + '/' + countryId, options)
      .pipe(
        tap((data) => {
          let test = data;
        }), //console.log('All: ' + JSON.stringify(data))
        catchError(this.handleError)
      );
  }
  createSaloon(saloonData) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.tokenManagerService.retrieveToken(),
    });
    let options = {
      headers: headers,
    };
    return this._http
      .post<any>(this._saloonUrl, saloonData, options)
      .pipe(catchError(this.handleError));
  }
  updateSaloon(saloonData) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.tokenManagerService.retrieveToken(),
    });
    let options = {
      headers: headers,
    };
    return this._http
      .post<any>(this._updateSaloonUrl, saloonData, options)
      .pipe(catchError(this.handleError));
  }
  getSaloons(): Observable<IPagedDataView<ISaloonView>> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.tokenManagerService.retrieveToken(),
    });
    let options = {
      headers: headers,
    };
    return this._http
      .get<IPagedDataView<ISaloonView>>(this._gerSaloonUrl, options)
      .pipe(
        tap(), //(data) => console.log('All: ' + JSON.stringify(data))
        catchError(this.handleError)
      );
  }
  getSaloonById(id: number): Observable<saloon> {
    let headers = new HttpHeaders({
      Authorization: 'bearer ' + this.tokenManagerService.retrieveToken(),
    });
    let options = {
      headers: headers,
    };
    return this._http
      .get<saloon>(this._getSaloonByIdUrl + '/' + id, options)
      .pipe(catchError(this.handleError));
  }
  getDays(): Observable<any[]> {
    let headers = new HttpHeaders({
      Authorization: 'bearer ' + this.tokenManagerService.retrieveToken(),
    });
    let options = {
      headers: headers,
    };
    return this._http
      .get<any[]>(this._getDaysUrl, options)
      .pipe(catchError(this.handleError));
  }
  getDentists(userRoldId): Observable<any[]> {
    let params = new HttpParams().append('roleId', userRoldId);
    let headers = new HttpHeaders({
      Authorization: 'bearer ' + this.tokenManagerService.retrieveToken(),
    });
    let options = {
      headers: headers,
      params: params,
    };
    return this._http
      .get<any[]>(this._getDentistsUrl, options)
      .pipe(catchError(this.handleError));
  }
  getLaboratories(): Observable<any[]> {
    let headers = new HttpHeaders({
      Authorization: 'bearer ' + this.tokenManagerService.retrieveToken(),
    });
    let options = {
      headers: headers,
    };
    return this._http
      .get<any[]>(this._getLaboratriesUrl, options)
      .pipe(catchError(this.handleError));
  }
  associateDentistWithSaloon(associateDendistWithSaloon) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.tokenManagerService.retrieveToken(),
    });
    let options = {
      headers: headers,
    };
    return this._http
      .post<any>(
        this._associateDentistWithSaloon,
        associateDendistWithSaloon,
        options
      )
      .pipe(catchError(this.handleError));
  }
  associateLaboratoryWithSaloon(associateLaboratoryWithSaloon) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.tokenManagerService.retrieveToken(),
    });
    let options = {
      headers: headers,
    };
    return this._http
      .post<any>(
        this._associateLaboratoryWithSaloon,
        associateLaboratoryWithSaloon,
        options
      )
      .pipe(catchError(this.handleError));
  }
  getAssociatedLabortoryBySaloonId(saloonId): Observable<any[]> {
    let headers = new HttpHeaders({
      Authorization: 'bearer ' + this.tokenManagerService.retrieveToken(),
    });
    let options = {
      headers: headers,
    };
    return this._http
      .get<any[]>(
        this._getAssociatedLabortoryBySaloonId + '/' + saloonId,
        options
      )
      .pipe(catchError(this.handleError));
  }
  DeleteAssociatedLaboratoryWithSaloon(laboratoryId) {
    let params = new HttpParams().append('saloonLaboratoryId', laboratoryId);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.tokenManagerService.retrieveToken(),
    });
    let options = {
      headers: headers,
      params: params,
    };
    return this._http
      .delete(this._deleteAssociatedLaboratorySaloonUrl, options)
      .pipe(catchError(this.handleError));
  }
  getAssociatedDentistsBySaloonId(saloonId): Observable<any[]> {
    let headers = new HttpHeaders({
      Authorization: 'bearer ' + this.tokenManagerService.retrieveToken(),
    });
    let options = {
      headers: headers,
    };
    return this._http
      .get<any[]>(
        this._getAssociatedDentistsWithSaloonUrl + '/' + saloonId,
        options
      )
      .pipe(catchError(this.handleError));
  }
  GetSaloonAdministratorsBySaloonId(saloonId): Observable<any[]> {
    let headers = new HttpHeaders({
      Authorization: 'bearer ' + this.tokenManagerService.retrieveToken(),
    });
    let options = {
      headers: headers,
    };
    return this._http
      .get<any[]>(
        this._getAssociatedSaloonAdmins + '/' + saloonId,
        options
      )
      .pipe(catchError(this.handleError));
  }
  DeleteAssociatedDentistWithSaloon(saloonEmployeeScheduleId) {
    let params = new HttpParams().append(
      'saloonEmployeeScheduleId',
      saloonEmployeeScheduleId
    );
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.tokenManagerService.retrieveToken(),
    });
    let options = {
      headers: headers,
      params: params,
    };
    return this._http
      .delete(this._deleteAssociatedDentistWithSaloonUrl, options)
      .pipe(catchError(this.handleError));
  }
  DeleteSaloonEmployee(saloonEmployeeId) {
    let params = new HttpParams().append(
      'saloonEmployeeId',
      saloonEmployeeId
    );
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.tokenManagerService.retrieveToken(),
    });
    let options = {
      headers: headers,
      params: params,
    };
    return this._http
      .delete(this._deleteSaloonEmployee, options)
      .pipe(catchError(this.handleError));
  }
  DeleteSaloon(saloonId) {
    let params = new HttpParams().append('saloonId', saloonId);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.tokenManagerService.retrieveToken(),
    });
    let options = {
      headers: headers,
      params: params,
    };
    return this._http
      .delete(this._deleteSaloonUrl, options)
      .pipe(catchError(this.handleError));
  }
  getSaloonsByCityId(locationId: number): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.tokenManagerService.retrieveToken(),
    });
    let options = {
      headers: headers,
    };
    return this._http
      .get<any>(this._searchSaloonByLocationIdUrl + '/' + locationId, options)
      .pipe(
        tap(), //(data) => console.log('All: ' + JSON.stringify(data))
        catchError(this.handleError)
      );
  }
  getSaloonAppointments(saloonId: number, date: string) : Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.tokenManagerService.retrieveToken(),
    });
    let options = {
      headers: headers,
    };
    return this._http
      .get<any>(this._getSaloonAppointmentsUrl + '/' + saloonId + '/' + date, options)
      .pipe(
        tap(), //(data) => console.log('All: ' + JSON.stringify(data))
        catchError(this.handleError)
      );
  }
  CreateAppointment(createAppointment){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.tokenManagerService.retrieveToken(),
    });
    let options = {
      headers: headers,
    };
    return this._http
      .post<any>(
        this._createAppointmentUrl,
        createAppointment,
        options
      )
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
