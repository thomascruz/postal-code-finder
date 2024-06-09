declare interface ICountry {
  name: string,
  code: string,
  flagEmoji: string,
  postalCode: {
    count?: number,
    format: string,
    maxLength: number,
    regex: string,
    example: string,
  }
}