import { Injectable } from '@angular/core';
import { TokenManagerService } from './TokenManagerService';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
    providedIn: 'root',
  })
export class HelperService {

    constructor(private tokenManagerService : TokenManagerService){        
    }

    getHeader() : any{
        let headers = new HttpHeaders({
            'Authorization': 'bearer ' + this.tokenManagerService.retrieveToken()
          });
          let options = {
            headers: headers,
          };
       
        return options;
    }
}