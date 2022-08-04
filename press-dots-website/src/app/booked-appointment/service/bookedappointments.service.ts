import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BaseService } from 'src/app/shared/service/baseService';
import { Observable } from 'rxjs';
import { IPagedDataView } from 'src/app/shared/view/IPagedDataView';
@Injectable({
    providedIn: 'root'
})
export class BookedAppointmentsService extends BaseService{
       
    url=`${this.apiUrl}Appointment/GetAppointmentbySaloonAdministratorId`
    patientUpdateUrl = `${this.apiUrl}Appointment/UpdateAppointmentState`
    getBookedAppointments(pageIndex,pageSize,userId,appointmentstate): Observable<IPagedDataView<any>> {       
    
        return this.http
        .get<IPagedDataView<any>>(`${this.url}?saloonAdministratorId=${userId}&stateId=${appointmentstate}&pageIndex=${pageIndex}&pageSize=${pageSize}`, this.createOptions())
        .pipe(
          tap(),
          catchError(this.handleError)
        );
      }
     

      updateAppointmentStatus(appointmentId,stateId,body){
        return this.http.put<any>(this.patientUpdateUrl+'?id='+appointmentId+'&stateId='+stateId,body,this.createOptions())
                    .pipe(catchError(this.handleError))
      }
}