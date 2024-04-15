import "./App.css";
import "./AppDark.css";
import React, { useState, useEffect } from "react";
import Sidebar from "components/sidebar/Sidebar";
import Main from "components/main/Main";
import capitalizeFirstLetter from "utils/capitalizeFirstLetter";
import { useCityData } from "hooks/useCityData";
import { useLoading } from "hooks/useLoading";
import { useAlert } from "hooks/useAlert";

function App() {
   const [isDarkTheme, setIsDarkTheme] = useState(false);
   const [currentWeatherData, setCurrentWeatherData] = useState({
      temp: 0,
      feelsLike: 0,
      precipitation: "",
   });
   const { cityData, setCityData } = useCityData();
   const { setIsLoading } = useLoading();
   const { setIsAlert } = useAlert();

   useEffect(() => {
      if (JSON.parse(localStorage.getItem("theme")))
         setIsDarkTheme(JSON.parse(localStorage.getItem("theme")));
   }, [isDarkTheme]);
   useEffect(() => {
      const storedCityData = JSON.parse(localStorage.getItem("cityData"));
      storedCityData ? setCityData(storedCityData) : getCityData(cityData.city);
   }, [setCityData]);
   useEffect(() => {
      if (cityData.latitude && cityData.longitud) {
         getCurrentWeatherData(cityData.latitude, cityData.longitud);
      }
   }, [cityData.latitude, cityData.longitud]);

   const handleTheme = () => {
      setIsDarkTheme(!isDarkTheme);
      localStorage.setItem("theme", JSON.stringify(!isDarkTheme));
   };
   const getCityData = (cityNameFromForm) => {
      setIsLoading(true);
      fetch(
         `https://nominatim.openstreetmap.org/search.php?q=${cityNameFromForm}&format=json&limit=1&accept-language=ru`
      )
         .then((response) => {
            if (response.ok) {
               return response.json();
            }
         })
         .then((data) => {
            if (!data.length) {
               setIsAlert({
                  active: true,
                  isRequested: true,
                  error: "Упс! Город не найден, попробуйте другой",
               });
            } else {
               const [standardizedCityName] = data[0].display_name.split(",");
               const obtainedCityData = {
                  city: standardizedCityName,
                  latitude: data[0].lat,
                  longitud: data[0].lon
               };
               setCityData(obtainedCityData);
               setIsAlert({
                  active: false,
                  isRequested: true,
                  error: "",
               });
               localStorage.setItem(
                  "cityData",
                  JSON.stringify(obtainedCityData)
               );
            }
         })
         .catch((err) => {
            console.error("Error fetching city's data:", err);
            setIsAlert({
               active: true,
               isRequested: true,
               error: "Упс, ошибка сервера! Попробуйте позже",
            });
         })
         .finally(() => setIsLoading(false));
   };
   const getCurrentWeatherData = (latitude, longitud) => {
      setIsLoading(true);
      fetch(
         `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitud}&units=metric&lang=ru&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
      )
         .then((response) => {
            return response.json();
         })
         .then(({ main, weather, wind, visibility, cod }) => {
            if (cod === 200) {
               setCurrentWeatherData({
                  temp: Math.round(main.temp),
                  feelsLike: Math.round(main.feels_like),
                  precipitation: capitalizeFirstLetter(weather[0].description),
                  weatherImg: `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`,
                  windSpeed: Math.floor(wind.speed),
                  windDirectionDeg: wind.deg,
                  humidity: main.humidity,
                  visibility: visibility / 1000,
                  pressure: Math.floor(main.pressure * 0.75),
               });
            }
         })
         .catch((err) => {
            console.error("Error fetching current weather's data:", err);
            setIsAlert({
               active: true,
               isRequested: true,
               error: "Упс, ошибка сервера! Попробуйте позже",
            });
         })
         .finally(() => setIsLoading(false));
   };

   return (
      <main className={"container" + (isDarkTheme ? " dark" : "")}>
         <Sidebar
            switchTheme={handleTheme}
            isDark={isDarkTheme}
            getCityData={getCityData}
            currentWeatherData={currentWeatherData}
         />
         <Main currentWeatherData={currentWeatherData} />
      </main>
   );
}

export default App;
