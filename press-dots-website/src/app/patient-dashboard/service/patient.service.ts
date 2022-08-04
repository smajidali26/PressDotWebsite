import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BaseService } from 'src/app/shared/service/baseService';
import { Observable } from 'rxjs';
import { IPagedDataView } from 'src/app/shared/view/IPagedDataView';
@Injectable({
    providedIn: 'root'
})
export class PatientService extends BaseService{
       
    url=`${this.apiUrl}Appointment/GetAppointmentbyCustomerId`
    patientUpdateUrl = `${this.apiUrl}Appointment/UpdateAppointmentState`
    
    getAppointmentsByUserId(pageIndex,pageSize,userId): Observable<IPagedDataView<any>> {       
    
        return this.http
        .get<IPagedDataView<any>>(`${this.url}?customerId=${userId}&pageIndex=${pageIndex}&pageSize=${pageSize}`, this.createOptions())
        .pipe(
          tap(),
          catchError(this.handleError)
        );
      }
      updateAppointmentStatus(appointmentId, stateId, body){
        return this.http.put<any>(this.patientUpdateUrl+'?id='+appointmentId+'&stateId='+stateId,body,this.createOptions())
                    .pipe(catchError(this.handleError))
      }
     
}