export class saloonCreateRequest {
  saloonName: string;
  email: string;
  phone: string;
  address: string;
  countryId: number;
  cityId: number;
  saloonTypeId: number;
}

export interface saloon {
  id: number;
  saloonName: string;
  email: string;
  phone: string;
  address: string;
  countryId: number;
  cityId: number;
  saloonTypeId: number;
}

export class saloonUpdateRequest {
  id: number;
  saloonName: string;
  email: string;
  phone: string;
  address: string;
  countryId: number;
  cityId: number;
  saloonTypeId: number;
}

export class associateDentistWithSaloonRequest {
  saloonId: number;
  employeeId: number;
  day: number;
  startTime: string;
  endTime: string;
}
export class associateLaboratoryWithSaloonRequest {
  saloonId: number;
  laboratoryId: number;
  isDefault: boolean;
}

export class IAssociatedLaboratriesWithSaloon {
  laboratoryId: number;
  laboratoryName: string;
  isDefault: boolean;
}
