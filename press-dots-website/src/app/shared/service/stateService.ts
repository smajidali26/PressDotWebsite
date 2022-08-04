import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BaseService } from 'src/app/shared/service/baseService';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StateService extends BaseService{
    
    stateUrl = `${this.apiUrl}State/GetAppointmentStates`
    
    getStates(): Observable<any> {           
        return this.http
        .get<any>(this.stateUrl, this.createOptions())
        .pipe(
          tap(),
          catchError(this.handleError)
        );
      }     
}