import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TokenManagerService } from './TokenManagerService';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BaseService{
    apiUrl = environment.apiUrl;
    
    constructor(private tokenManagerService : TokenManagerService,public http:HttpClient){}

    createOptions(){
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.tokenManagerService.retrieveToken()
          });
          let options = {
            headers: headers,
          };
          return options;
    }

    public handleError(err: HttpErrorResponse) {      
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
          errorMessage = `An error occurred: ${err.error.message}`;
        } else {
          errorMessage =  `${err.error.Message}`;
        }
        return throwError(errorMessage);
      }
}