'use client'

import { useEffect, useState } from "react";
import classNames from "classnames";

import { SupportedCountries } from "@/lib/contants/SupportedCountries";
import { getHistory } from "@/lib/utils/searchHistory";

import s from "./style.module.scss";

const SearchBox: React.FC<{
  className?: string;
  onChange?: (value: boolean) => void;
  onSubmit: (countryIndex: number, postalCode: string) => void;
  errorMessage?: string;
}> = ({ 
  className, 
  errorMessage, 
  onChange,
  onSubmit
}) => {
  const [ selectedCountryIndex, setSelectedCountryIndex ] = useState<number>(0);
  const [ selectedCountry, setSelectedCountry ] = useState<ICountry>(SupportedCountries[selectedCountryIndex]);
  const [ postalCode, setPostalCode ] = useState<string>('');
  const [ pastSearches, setPastSearches ] = useState<IPastSearch[]>([]);
  
  const [ postalCodeError, setPostalCodeError ] = useState<string>('');
  const [ isSearchBtnDisabled, setIsSearchBtnDisabled ] = useState<boolean>(true);

  const onCountrySelectChange = (value: string, resetPostalCode?: boolean) => {
    setSelectedCountryIndex(parseInt(value, 10));
    setSelectedCountry(SupportedCountries[parseInt(value, 10)]);
    if (resetPostalCode) {
      setPostalCode('');
      setIsSearchBtnDisabled(true);
    }
  }

  const onPostalCodeInputChange = (value: string) => {
    if (value.length <= selectedCountry.postalCode.maxLength) {
      setPostalCode(value);
    }
    setIsSearchBtnDisabled(value.match(selectedCountry.postalCode.regex) === null);
  };

  const handleSubmit = (e?: any) => {
    e?.preventDefault();
    onSubmit(selectedCountryIndex, postalCode);
  };

  const handlePastSearchClick = (countryIndex: number, postalCode: string) => {
    onCountrySelectChange(countryIndex.toString());
    setPostalCode(postalCode);
    onSubmit(countryIndex, postalCode);
  };

  useEffect(() => {
    const history = getHistory();
    setPastSearches(history);
  }, []);

  return (
    <div className={classNames(className, s.searchBox)}>
      <form onSubmit={handleSubmit}>

        <div className={s.inputsContainer}>
          <div className={s.countrySelector}>
            <select
              className={s.countrySelect}
              title="Country"
              aria-description="Country"
              value={selectedCountryIndex}
              onChange={(e) => onCountrySelectChange(e.target.value, true)}
            >
              {SupportedCountries.map((country, index) => (
                <option key={index} value={index}>
                  {`${country.flagEmoji} ${country.name}`}
                </option>
              ))}
            </select>
          </div>

          <span className={s.postalCodesCount}>
            {selectedCountry.postalCode.count}
            <br/>
            postal codes
          </span>

          <div className={s.searchInput}>
            <input
              type="text"
              title="Postal Code"
              aria-description="Postal Code"
              max={selectedCountry.postalCode.maxLength}
              value={postalCode}
              onChange={(e) => onPostalCodeInputChange(e.target.value)}
              placeholder={selectedCountry.postalCode.example}
            />
          </div>
        </div>

        <div className={s.searchButton}>
          <button 
            className={s.button}
            type="submit"
            disabled={isSearchBtnDisabled}
            onClick={handleSubmit}
          >
            Search
          </button>
        </div>

        {
          pastSearches.length > 0 && (
            <div className={s.pastSearches}>
              <h6 className={s.title}>Past searches</h6>
              <ul>
                {
                  pastSearches.map((search, index) => (
                    <li key={index} onClick={() => handlePastSearchClick(search.countryIndex, search.postalCode)}>
                      {`${SupportedCountries[search.countryIndex].code} ${search.postalCode}`}
                    </li>
                  )).reverse()
                }
              </ul>
            </div>
          )
        }
      </form>
    </div>
  );
};

export default SearchBox;
