import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BaseService } from 'src/app/shared/service/baseService';
import { Observable } from 'rxjs';
import { IPagedDataView } from 'src/app/shared/view/IPagedDataView';
@Injectable({
    providedIn: 'root'
})
export class LabOrderService extends BaseService{
       
    OrderUrl=`${this.apiUrl}Order/GetOrdersByLaboratoryUserId`
    
    getOrders(pageIndex,pageSize,labUserId): Observable<IPagedDataView<any>> {       
    
        return this.http
        .get<IPagedDataView<any>>(`${this.OrderUrl}?userid=${labUserId}&pageIndex=${pageIndex}&pageSize=${pageSize}`, this.createOptions())
        .pipe(
          tap(),
          catchError(this.handleError)
        );
      }
     
}