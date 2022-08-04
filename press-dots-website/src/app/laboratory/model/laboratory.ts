export class createLaboratoryRequest{
laboratoryName : string;

}

export class UpdateLaboratoryRequest{
    id: number;
    laboratoryName : string;    
    }

export interface ILaboratoryView{
    id: number;
    laboratoryName:String;    
}

export interface laboratory{
    laboratoryName:string;
}

export class AddLaboratoryUser{
    laboratoryId: number;
    userId: number;
    isEmailReceiver: boolean;
}