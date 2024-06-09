declare interface IPostalCodeRes {
  postCode: string,
  country: string,
  countryCode: string,
  places: [IPlace],
}

declare interface IPlace {
  placeName: string,
  state: string,
  stateCode: string,
  latitude: number,
  longitude: number,
}