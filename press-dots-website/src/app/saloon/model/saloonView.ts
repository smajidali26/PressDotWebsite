export interface ILocation {
  id: number;
  locationName: string;
  parentLocationId?: number;
}

export interface ISaloonView {
  id: number;
  saloonName: string;
  countryId: number;
  cityId: number;
  country: ILocation;
  city: ILocation;
  phone: string;
  email: string;
  address: string;
}
