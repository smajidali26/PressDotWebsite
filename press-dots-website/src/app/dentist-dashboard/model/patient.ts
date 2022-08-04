import { Time } from '@angular/common';

export interface IPatientView{
    patientName:String    
    customerId: number,
    doctorId:number,
    saloonId:number,
    symptoms : string,
    date : string,
    startTime : TimeRanges,
    endTime : Time
}

export class CreateOrderRequest
{
    appointmentId:number
    laboratoryId:number
    Description:string
    stateId:number
}