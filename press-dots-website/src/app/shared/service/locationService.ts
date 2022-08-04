import { Injectable } from '@angular/core';
import { environment} from '../../../environments/environment'
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ICountry } from '../../registration/model/country';
import { TokenManagerService } from './TokenManagerService';
import { IPagedDataView } from '../view/IPagedDataView';

@Injectable({
    providedIn: 'root',
  })
export class LocationService{
    apiUrl = environment.apiUrl;
    countryUrl = this.apiUrl + 'Location/GetParentLocations';
    allCountryUrl = this.apiUrl + 'Location/GetLocations';
    cityUrl = this.apiUrl + 'Location/GetLocationsByParentId';
    countrySaveUrl = this.apiUrl + 'Location/Create';
    constructor(private http: HttpClient,private tokenManagerService : TokenManagerService){

    }

    getAllCountries(){
      let headers = new HttpHeaders({
          'Authorization': 'bearer ' + this.tokenManagerService.retrieveToken()
        });
        let options = {
          headers: headers,
        };
      return this.http.get<IPagedDataView<any>>(this.allCountryUrl,options).pipe(
          tap((data) => console.log('All: ' + JSON.stringify(data))),
          catchError(this.handleError)
        );
  }

    getCountries(){
        let headers = new HttpHeaders({
            'Authorization': 'bearer ' + this.tokenManagerService.retrieveToken()
          });
          let options = {
            headers: headers,
          };
        return this.http.get<ICountry[]>(this.countryUrl,options).pipe(
            tap((data) => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
          );
    }

    getCities(parentId){
        let headers = new HttpHeaders({
            'Authorization': 'bearer ' + this.tokenManagerService.retrieveToken()
          });
          let options = {
            headers: headers,
          };
        return this.http.get<ICountry[]>(this.cityUrl + '/'+parentId,options).pipe(
            tap((data) => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
          );
    }

    saveLocation(locationName, parentLocationId){
      var request = this.getSaveLocationRequest(locationName, parentLocationId);
      let headers = new HttpHeaders({
        'Authorization': 'bearer ' + this.tokenManagerService.retrieveToken()
      });
      let options = {
        headers: headers,
      };
      return this.http.post<any>(this.countrySaveUrl,request,options)
      .pipe(catchError(this.handleError));
      
    }

    getSaveLocationRequest(locationName, parentLocationId): SaveLocationRequest{
      var model = new SaveLocationRequest();
      model.locationName = locationName;
      model.parentLocationId = parentLocationId;
      return model;
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

export class SaveLocationRequest{
  locationName: string
  parentLocationId: number
}