import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BaseService } from 'src/app/shared/service/baseService';
import { Observable } from 'rxjs';
import { AddLaboratoryUser, ILaboratoryView, laboratory, UpdateLaboratoryRequest } from '../model/laboratory';
import { IPagedDataView } from 'src/app/shared/view/IPagedDataView';
@Injectable({
    providedIn: 'root'
})
export class LaboratoryService extends BaseService{ 
  
   
    laboratoryUrl = this.apiUrl + 'Laboratory/Create';
    laboratoryGetUrl = this.apiUrl + 'Laboratory/GetLaboratories';
    deleteLaboratoryUrl = this.apiUrl + 'Laboratory/Delete';
    updateLaboratoryUrl = this.apiUrl + 'Laboratory/Edit';
    GetLaboratoryByIdUrl = this.apiUrl + 'Laboratory/Get';
    addLaboratoryUserAssociateUrl = this.apiUrl + 'LaboratoryUsers/CreateLaboratoryUser';
    GetLaboratoryUserByLaboratoryIdUrl = this.apiUrl +  'LaboratoryUsers/GetLaboratoryUsersByLaboratoryId';
    DeletetLaboratoryUserAssociationUrl = this.apiUrl +  'LaboratoryUsers/DeleteLaboratoryUser';
    create(data){
          return this.http
            .post<any>(this.laboratoryUrl, data, this.createOptions())
            .pipe(catchError(this.handleError));
    }
    getLaboratories(pageIndex,pageSize): Observable<IPagedDataView<ILaboratoryView>> {       
    
        return this.http
        .get<IPagedDataView<ILaboratoryView>>(this.laboratoryGetUrl+'?pageIndex='+pageIndex+'&pageSize='+pageSize, this.createOptions())
        .pipe(
          tap(),
          catchError(this.handleError)
        );
      }
      getLaboratoryId(id: number): Observable<laboratory> {
        return this.http
          .get<laboratory>(this.GetLaboratoryByIdUrl + '/' + id, this.createOptions())
          .pipe(catchError(this.handleError));
      }
      updateLaboratory(Laboratory) {
        return this.http
          .post<UpdateLaboratoryRequest>(this.updateLaboratoryUrl, Laboratory, this.createOptions())
          .pipe(catchError(this.handleError));
      }
      DeleteLaboratory(laboratoryId) {
        return this.http
          .delete(this.deleteLaboratoryUrl + '?laboratoryId=' + laboratoryId ,this.createOptions())
          .pipe(catchError(this.handleError));
      }
      AddLaboratoryUserAssociate(User) {
        return this.http
          .post<AddLaboratoryUser>(this.addLaboratoryUserAssociateUrl, User, this.createOptions())
          .pipe(catchError(this.handleError));
      }
      GetLaboratoryUsersByLaboratoryId(id){
        return this.http
          .get<any>(this.GetLaboratoryUserByLaboratoryIdUrl + '/' + id, this.createOptions())
          .pipe(catchError(this.handleError));
      }
      DeleteLaboratoryUserAssociation(laboratoryUserId) {
        return this.http
          .delete(this.DeletetLaboratoryUserAssociationUrl + '?laboratoryUserId=' + laboratoryUserId ,this.createOptions())
          .pipe(catchError(this.handleError));
      }
}