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
