
export interface ICustomerView{
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    mobileNumber : number,
    isActive: boolean   
}
export class CustomerUpdateRequest{
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    mobileNumber : number;
    isActive: boolean;
    userRoleId: number;   
}