import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'active'
})
export class ActivePipe implements PipeTransform {
     transform(value: boolean): string {
        if(value == true){
            return "Yes";
        }else{
            return "No";
        }
      }
 }