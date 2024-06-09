"use client";

import { useState } from "react";
import classNames from "classnames";

import s from "./style.module.scss";

const ResultCard: React.FC<{
  className?: string;
  postalCode?: string;
  city?: string;
  state?: string;
  stateAbbreviation?: string;
  country?: string;
  lat?: number;
  lng?: number;
}> = ({ 
  className,
  postalCode,
  city,
  state,
  stateAbbreviation,
  country,
  lat,
  lng
}) => {

  const [isButtonTimeoutFinished, setIsButtonTimeoutFinished] = useState<boolean>(true);

  const handleCopyToClipboard = () => {
    if (typeof window === 'undefined') return;

    const text = `${postalCode}, ${city}, ${state} (${stateAbbreviation}), ${country}, ${lat}, ${lng}`;
    navigator.clipboard.writeText(text);

    setIsButtonTimeoutFinished(false);
    setTimeout(() => {
      setIsButtonTimeoutFinished(true);
    }, 2000);
  };

  return (
    <div className={classNames(className, s.resultCard)}>
      <span className={s.resultSubtitle}>{country}</span>
      <h2 className={s.resultTitle}>{postalCode}</h2>

      <div className={s.infos}>

        <div className={s.infoGroup}>
          <p className={s.resultInfo}>{city}</p>
          <p className={s.resultInfo}>{`${state} ${stateAbbreviation !== '' ? `(${stateAbbreviation})` : ''}`}</p>
        </div>

        <div className={s.infoGroup}>
          <div className={s.coords}>
            <span>{lat}</span>
            <span>{lng}</span>
          </div>
        </div>

      </div>

      <button
        className={s.copyBtn}
        onClick={handleCopyToClipboard}
      >
        {isButtonTimeoutFinished ? 'Copy' : 'Copied!'}
      </button>
    </div>
  );
};

export default ResultCard;
