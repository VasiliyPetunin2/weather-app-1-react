import "./Slider.css";
import "./SliderDark.css";
import React, { useState, useEffect } from "react";
import Button from "components/common/button/Button";
import SliderCard from "components/sliderCard/SliderCard";
import { useCityData } from "hooks/useCityData";
import getForecastDataByDays from "utils/getForecastDataByDays";
import getConvertUnixToRussianDayAndDate from "utils/getConvertedUnixToRussianDayAndDate";
import getConvertedUnixToRussianTimeShort from "utils/getConvertedUnixToRussianTimeShort";
import getForecastImageForDay from "utils/getForecastImageForDay";
import getForecastImageDescriptionForDay from "utils/getForecastImageDescriptionForDay";
import getMaxTempForDay from "utils/getMaxTempForDay";
import getMinTempForDay from "utils/getMinTempForDay";
import capitalizeFirstLetter from "utils/capitalizeFirstLetter";

const Slider = ({ type }) => {
   const [predictionsInfo, setPredictionsInfo] = useState([]);
   const [screenWidth] = useState(window.innerWidth);
   const [cardsPerSlide, setCardsPerSlide] = useState(6);
   const [totalCards, setTotalCards] = useState(0);
   const [currentCardIndex, setCurrentCardIndex] = useState(0);
   const [isBtnPrevActive, setIsBtnPrevActive] = useState(false);
   const [isBtnNextActive, setIsBtnNextActive] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const { cityData } = useCityData();

   useEffect(() => {
      if (cityData.latitude && cityData.longitud) getForecastData();
   }, [cityData, type]);
   useEffect(() => {
      if (predictionsInfo) {
         setTotalCards(predictionsInfo.length);
         setCurrentCardIndex(0);
      }
   }, [type, predictionsInfo]);
   useEffect(() => {
      if (screenWidth > 833 && screenWidth < 1440) {
         setCardsPerSlide(3);
      } else if (screenWidth < 833) {
         setCardsPerSlide(totalCards);
      } else {
         setCardsPerSlide(6);
      }
   }, [screenWidth, totalCards]);
   useEffect(() => {
      if (predictionsInfo) {
         predictionsInfo[currentCardIndex - 1]
            ? setIsBtnPrevActive(true)
            : setIsBtnPrevActive(false);
         predictionsInfo[currentCardIndex + cardsPerSlide]
            ? setIsBtnNextActive(true)
            : setIsBtnNextActive(false);
      }
   }, [currentCardIndex, totalCards, predictionsInfo, type]);

   const startIndex = currentCardIndex;
   const endIndex = currentCardIndex + cardsPerSlide;
   const currentCards = predictionsInfo?.slice(startIndex, endIndex) || [];

   const goToNextCard = () => {
      setCurrentCardIndex((prevIndex) => (prevIndex + 1) % totalCards);
   };
   const goToPreviousCard = () => {
      setCurrentCardIndex((prevIndex) => (prevIndex - 1) % totalCards);
   };

   const getForecastData = () => {
      setIsLoading(true);
      fetch(
         `https://api.openweathermap.org/data/2.5/forecast?lat=${cityData.latitude}&lon=${cityData.longitud}&units=metric&lang=ru&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
      )
         .then((response) => response.json())
         .then(({ list, city }) => {
            let obtainedForecastData = [];
            if (list && type === "weekly") {
               const forecastDataByDays = getForecastDataByDays(list); // This is an object
               Object.keys(forecastDataByDays).forEach((key) => {
                  obtainedForecastData.push({
                     date: getConvertUnixToRussianDayAndDate(
                        forecastDataByDays[key][0].dt,
                        city.timezone
                     ),
                     img: getForecastImageForDay(forecastDataByDays[key]),
                     imgDescription: getForecastImageDescriptionForDay(
                        forecastDataByDays[key]
                     ),
                     temperature: {
                        atDay:
                           Math.round(
                              getMaxTempForDay(forecastDataByDays[key])
                           ) + "°C",
                        atNight:
                           Math.round(
                              getMinTempForDay(forecastDataByDays[key])
                           ) + "°C",
                     },
                  });
               });
            }
            if (list && type === "hourly") {
               list.map((elem, index) => {
                  if (index < 11) {
                     obtainedForecastData.push({
                        time: getConvertedUnixToRussianTimeShort(
                           elem.dt,
                           city.timezone
                        ),
                        img: `https://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`,
                        imgDescription: capitalizeFirstLetter(
                           elem.weather[0].description
                        ),
                        temperature: Math.round(elem.main.temp) + "°C",
                     });
                  }
               });
            }
            setPredictionsInfo(obtainedForecastData);
         })
         .catch((err) => {
            console.error("Error fetching forecast weather's data:", err);
         })
         .finally(() => setIsLoading(false));
   };

   return (
      <ul className='slider'>
         <Button
            classes={[
               "sliderBtn",
               "sliderBtnPrev",
               !isBtnPrevActive && "sliderBtnUnavaible",
            ]}
            attributes={{
               "aria-label": "Предыдующая карточка",
            }}
            content={
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='38'
                  height='38'
                  viewBox='0 0 38 38'
                  fill='white'
                  className='sliderBtnIMG'
               >
                  <circle
                     cx='19'
                     cy='19'
                     r='19'
                     transform='rotate(-180 19 19)'
                  />
                  <path
                     d='M23 24.5L13.8735 18.8503C13.242 18.4593 13.242 17.5407 13.8735 17.1497L23 11.5'
                     stroke='#ACACAC'
                     strokeWidth='3'
                  />
               </svg>
            }
            onClickFunc={isBtnPrevActive ? goToPreviousCard : () => {}}
         />

         {currentCards
            ? currentCards.map((predictionData, index) => (
                 <SliderCard
                    key={index}
                    predictionData={predictionData}
                    isLoading={isLoading}
                 />
              ))
            : ""}

         <Button
            classes={[
               "sliderBtn",
               "sliderBtnNext",
               !isBtnNextActive && "sliderBtnUnavaible",
            ]}
            attributes={{
               "aria-label": "Следующая карточка",
            }}
            content={
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='38'
                  height='38'
                  viewBox='0 0 38 38'
                  fill='white'
                  className='sliderBtnIMG'
               >
                  <circle cx='19' cy='19' r='19' />
                  <path
                     d='M15 13.5L24.1265 19.1497C24.758 19.5407 24.758 20.4593 24.1265 20.8503L15 26.5'
                     stroke='#ACACAC'
                     strokeWidth='3'
                  />
               </svg>
            }
            onClickFunc={isBtnNextActive ? goToNextCard : () => {}}
         />
      </ul>
   );
};

export default Slider;
