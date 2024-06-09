import { SupportedCountries } from "../contants/SupportedCountries";

export const getHistory = (): IPastSearch[] => {
  const historyRaw = localStorage.getItem('searchHistory');
  const history = historyRaw ? JSON.parse(historyRaw) : [];

  return history;
};

export const addToHistory = (countryIndex: number, postalCode: string) => {
  let history: IPastSearch[] = getHistory();

  history.push(
    {
      countryIndex,
      countryCode: SupportedCountries[countryIndex].code,
      postalCode,
      timestamp: new Date().getTime()
    }
  );

  console.log(history.length)
  if (history.length > 3) {
   history = history.slice(history.length - 3, history.length);
  }

  localStorage.setItem('searchHistory', JSON.stringify(history));
};

export const prepopulateHistory = () => {
  const dummyHistory = [{"countryIndex":0,"countryCode":"DE","postalCode":"12053","timestamp":1717942225100},{"countryIndex":1,"countryCode":"US","postalCode":"90210","timestamp":1717942231807},{"countryIndex":3,"countryCode":"PH","postalCode":"9811","timestamp":1717942236533}];
  localStorage.setItem('searchHistory', JSON.stringify(dummyHistory));
};