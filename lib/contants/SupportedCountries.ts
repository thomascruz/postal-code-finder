export const SupportedCountries: ICountry[] = [
  {
    name: "Germany",
    code: "DE",
    flagEmoji: '🇩🇪',
    postalCode: {
      count: 16482,
      format: "000000",
      maxLength: 5,
      regex: "^(\\d{5})$",
      example: "12049",
    },
  },
  {
    name: "United States",
    code: "US",
    flagEmoji: '🇺🇸',
    postalCode: {
      count: 43624,
      format: "00000",
      maxLength: 5,
      regex: "^(\\d{5})$",
      example: "90210",
    },
  },
  // {
  //   name: "Brasil",
  //   code: "BR",
  //   flagEmoji: '🇧🇷',
  //   postalCode: {
  //     format: "00000-000",
  //     maxLength: 8,
  //     regex: "^(\\d{5})-(\\d{3})$",
  //     example: "70000-000",
  //   }
  // }
]