import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { BaseService } from 'src/app/shared/service/baseService';
@Injectable({
    providedIn: 'root'
})
export class ChangePasswordService extends BaseService{
   
    changepasswordUrl = this.apiUrl + 'Account/ChangePassword';
   
    changePassword(data){
          return this.http
            .post<any>(this.changepasswordUrl, data, this.createOptions())
            .pipe(catchError(this.handleError));
    }
  
}