'use client';
import { useEffect, useState } from "react";

import { SupportedCountries } from "@/lib/contants/SupportedCountries";
import { postalCodeSearch } from "@/lib/utils/postalCodeSearch";
import { addToHistory, getHistory, prepopulateHistory } from "@/lib/utils/searchHistory";

import MapContainerComponent from "@/components/Map";
import SearchBox from "@/components/SearchBox";
import ResultCard from "@/components/ResultCard";

import s from "./page.module.scss";
import classNames from "classnames";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [postalCode, setPostalCode] = useState<string>('');
  const [searchResult, setSearchResult] = useState<IPostalCodeRes | false>(false);
  const [mapCoords, setMapCoords] = useState<[number, number]>([0, 0]);
  const [mapZoom, setMapZoom] = useState<number>(16);

  const search = async (e: any, countryIndex: number, postalCode: string, saveToHistory?: boolean) => {
    e?.preventDefault();
    setLoading(true);
    setPostalCode(postalCode);
    const postRes: IPostalCodeRes | false = await postalCodeSearch(
      SupportedCountries[countryIndex].code,
      postalCode
    );
    setSearchResult(postRes);
    if (postRes && postRes.places.length > 0) {
      setMapCoords([postRes.places[0].latitude, postRes.places[0].longitude]);
      setMapZoom(16);
    } else {
      setMapCoords([0, 0]);
      setMapZoom(2);
    }

    if (saveToHistory) {
      addToHistory(countryIndex, postalCode);
    }

    setLoading(false);
  };
  
  useEffect(() => {
    search(undefined, 0, '12049');
    if (getHistory().length === 0) {
      prepopulateHistory();
    }
  }, []);

  return (
    <main className={s.main}>
      <div className={s.content}>

        <SearchBox
          className={s.searchBox}
          onSubmit={(countryIndex, postalCode) => search(undefined, countryIndex, postalCode, true)}
        />

        {
          postalCode && searchResult ? (
            <ResultCard
              className={s.resultCard}
              postalCode={postalCode}
              city={searchResult?.places[0]?.placeName}
              state={searchResult?.places[0]?.state}
              stateAbbreviation={searchResult?.places[0]?.stateCode}
              country={searchResult?.country}
              lat={searchResult?.places[0]?.latitude}
              lng={searchResult?.places[0]?.longitude}
            />
          ) : (
            <div className={classNames(s.emptyResult, s.resultCard)}>
              No places found with postal code: {postalCode}
            </div>
          )
        }

        <div className={s.mapContainer}>
          <MapContainerComponent 
            lat={mapCoords[0]}
            lng={mapCoords[1]}
            zoom={mapZoom}
          />
        </div>

      </div>
    </main>
  );
}
