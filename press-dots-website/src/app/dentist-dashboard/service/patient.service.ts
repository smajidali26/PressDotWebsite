import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BaseService } from 'src/app/shared/service/baseService';
import { Observable } from 'rxjs';
import { IPagedDataView } from 'src/app/shared/view/IPagedDataView';
@Injectable({
    providedIn: 'root'
})
export class PatientService extends BaseService{
    
    patientGetUrl = `${this.apiUrl}Appointment/GetAppointmentbyDoctorId`
    patientUpdateUrl = `${this.apiUrl}Appointment/UpdateAppointmentState`
    createOrderUrl=`${this.apiUrl}Order/CreateOrder`
    getPatients(pageIndex,pageSize,doctorId): Observable<IPagedDataView<any>> {       
    
        return this.http
        .get<IPagedDataView<any>>(`${this.patientGetUrl}?doctorId=${doctorId}&pageIndex=${pageIndex}&pageSize=${pageSize}`, this.createOptions())
        .pipe(
          tap(),
          catchError(this.handleError)
        );
      }

      updateAppointmentStatus(appointmentId,stateId,body){
        return this.http.put<any>(this.patientUpdateUrl+'?id='+appointmentId+'&stateId='+stateId,body,this.createOptions())
                    .pipe(catchError(this.handleError))
      }

      createOrder(orderData){
        return this.http
        .post<any>(this.createOrderUrl, orderData, this.createOptions())
        .pipe(catchError(this.handleError));
      }
}