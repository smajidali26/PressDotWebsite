import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { BaseService } from 'src/app/shared/service/baseService';
@Injectable({
    providedIn: 'root'
})
export class SaloonService extends BaseService{
   
    saloonUrl = this.apiUrl + 'Saloon/Create';
   
    createSaloon(data){
          return this.http
            .post<any>(this.saloonUrl, data, this.createOptions())
            .pipe(catchError(this.handleError));
    }

   
}