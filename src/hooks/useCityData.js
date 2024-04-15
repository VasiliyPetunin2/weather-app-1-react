import { useContext } from "react";
import { CityDataContext } from "context/CityDataContext";

export const useCityData = () => useContext(CityDataContext);