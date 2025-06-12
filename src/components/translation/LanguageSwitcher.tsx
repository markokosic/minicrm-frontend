import React, { useState, useEffect } from 'react';
import i18n from 'i18next';

type LngRet = { [lng: string]: { nativeName: string } };

const defaultLngs: LngRet = {
  en: { nativeName: 'English' },
  de: { nativeName: 'Deutsch' },
  sr: { nativeName: 'Srpski (latinica)' },
};

export default function LanguageSwitcher() {
  const [currentLng, setCurrentLng] = useState(i18n.resolvedLanguage);
  const [lngs, setLngs] = useState<LngRet>(defaultLngs);

  useEffect(() => {
    if (i18n.services?.backendConnector?.backend?.getLanguages) {
      i18n.services.backendConnector.backend.getLanguages().then((ret: LngRet) => {
        setLngs(ret);
      });
    }
  }, []);

  function changeLanguage(lng: string) {
    if (lng === currentLng) return;
    i18n.changeLanguage(lng).then(() => setCurrentLng(lng));
  }

  return (
    <select
      value={currentLng}
      onChange={(e) => changeLanguage(e.target.value)}
    >
      {Object.entries(lngs).map(([lng, { nativeName }]) => (
        <option
          key={lng}
          value={lng}
        >
          {nativeName}
        </option>
      ))}
    </select>
  );
}
