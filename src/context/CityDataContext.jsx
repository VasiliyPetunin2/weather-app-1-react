import { createContext, useState } from 'react';

export const CityDataContext = createContext();

export const CityDataProvider = ({ children }) => {
  const [cityData, setCityData] = useState({
    city: 'Москва',
    latitude: '',
    longitude: ''
  });

  return (
    <CityDataContext.Provider value={{ cityData, setCityData }}>
      {children}
    </CityDataContext.Provider>
  );
};
// 55.625578