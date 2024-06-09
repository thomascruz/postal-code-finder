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
  {
    name: "Australia",
    code: "AU",
    flagEmoji: '🇦🇺',
    postalCode: {
      count: 10161,
      format: "00000",
      maxLength: 4,
      regex: "^(\\d{4})$",
      example: "2150",
    },
  },
  {
    name: "Phillippines",
    code: "PH",
    flagEmoji: '🇵🇭',
    postalCode: {
      count: 2232,
      format: "00000",
      maxLength: 4,
      regex: "^(\\d{4})$",
      example: "9811",
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