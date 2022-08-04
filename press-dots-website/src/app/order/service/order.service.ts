import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BaseService } from 'src/app/shared/service/baseService';
import { Observable } from 'rxjs';
import { IPagedDataView } from 'src/app/shared/view/IPagedDataView';
@Injectable({
    providedIn: 'root'
})
export class OrderService extends BaseService{
    
    orderGetUrl = `${this.apiUrl}Order/GetOrdersByDoctorId`
    orderUpdateUrl = `${this.apiUrl}Appointment/UpdateAppointmentState`
    getOrders(pageIndex,pageSize,doctorId): Observable<IPagedDataView<any>> {       
    
        return this.http
        .get<IPagedDataView<any>>(`${this.orderGetUrl}?doctorId=${doctorId}&pageIndex=${pageIndex}&pageSize=${pageSize}`, this.createOptions())
        .pipe(
          tap(),
          catchError(this.handleError)
        );
      }

      updateOrder(appointmentId,stateId,body){
        return this.http.put<any>(this.orderUpdateUrl+'?Id='+appointmentId+'&stateId='+stateId,body,this.createOptions())
                    .pipe(catchError(this.handleError))
      }
}