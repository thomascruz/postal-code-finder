const SEARCH_URL = 'https://api.zippopotam.us';

export const postalCodeSearch = async (countryCode: string, postalCode: string) => {
  
  const searchRes = await fetch(`${SEARCH_URL}/${countryCode}/${postalCode}`);
  const searchJson = await searchRes.json();

  if (searchJson.error || !searchJson.places?.length) {
    return false;
  }

  return {
    postCode: searchJson['post code'],
    country: searchJson.country,
    countryCode: searchJson['country abbreviation'],
    places: [
      {
        placeName: searchJson.places[0]['place name'],
        state: searchJson.places[0].state,
        stateCode: searchJson.places[0]['state abbreviation'],
        latitude: searchJson.places[0].latitude,
        longitude: searchJson.places[0].longitude,
      }
    ]
  } as IPostalCodeRes;
}