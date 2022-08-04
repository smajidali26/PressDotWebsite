import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { BaseService } from 'src/app/shared/service/baseService';
@Injectable({
    providedIn: 'root'
})
export class SaloonEmployeeService extends BaseService{
   
    saloonUrl = this.apiUrl + 'SaloonEmployee/Create';
   
    createSaloonEmployee(data){
          return this.http
            .post<any>(this.saloonUrl, data, this.createOptions())
            .pipe(catchError(this.handleError));
    }
  
}