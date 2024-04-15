import "./Sidebar.css";
import "./SidebarDark.css";
import React, { useState, useEffect } from "react";
import locationLogo from "../../assets/images/locationPicture.svg";
import getCurrentFormattedDate from "utils/getCurrentFormattedDate";
import Button from "components/common/button/Button";
import LoadIndicator from "components/common/loadIndicator/LoadIndicator";
import SearchCityPanel from "components/modalWindow/SearchCityPanel";
import { useCityData } from "hooks/useCityData";
import { useLoading } from "hooks/useLoading";

const Sidebar = ({ switchTheme, getCityData, currentWeatherData }) => {
   const [isModalOpen, setModalOpen] = useState(false);
   const [currentFormattedDate, setCurrentFormattedDate] = useState("");
   const [historyOfSearching, setHistoryOfSearching] = useState([]);
   const { cityData } = useCityData();
   const { isLoading } = useLoading();

   useEffect(() => {
      const historyDataOrNull = JSON.parse(
         localStorage.getItem("historyOfSearching")
      );
      if (historyDataOrNull) setHistoryOfSearching(historyDataOrNull);
   }, []);
   useEffect(() => setCurrentFormattedDate(getCurrentFormattedDate()), []);
   useEffect(() => {
      if (historyOfSearching.length > 5) {
         const duplicatedHistoryOfSearching = [...historyOfSearching];
         duplicatedHistoryOfSearching.pop();
         setHistoryOfSearching(duplicatedHistoryOfSearching);
      }
   }, [historyOfSearching]);

   const handleModalWindow = () => setModalOpen(!isModalOpen);

   return (
      <section className='side-bar'>
         {isLoading ? (
            <LoadIndicator />
         ) : (
            <>
               <div className='side-bar-btnsRow'>
                  <Button
                     classes={["btn", "btn-searchCity"]}
                     content={"Поиск города"}
                     onClickFunc={handleModalWindow}
                  />
                  <Button
                     onClickFunc={switchTheme}
                     classes={["btn-switchTheme"]}
                     attributes={{ "aria-label": "Сменить тему" }}
                     content={
                        <svg
                           width='64'
                           height='32'
                           viewBox='0 0 64 32'
                           fill='none'
                           xmlns='http://www.w3.org/2000/svg'
                        >
                           <path
                              id='switchThemeBtnBackground'
                              d='M1 16C1 7.71573 7.71573 1 16 1H48C56.2843 1 63 7.71573 63 16C63 24.2843 56.2843 31 48 31H16C7.71573 31 1 24.2843 1 16Z'
                              stroke='#ACACAC'
                              strokeWidth='2'
                           />
                           <path
                              id='switchThemeBtnIconBackground'
                              fillRule='evenodd'
                              clipRule='evenodd'
                              d='M6 16C6 10.4772 10.4772 6 16 6C21.5228 6 26 10.4772 26 16C26 21.5228 21.5228 26 16 26C10.4772 26 6 21.5228 6 16Z'
                              fill='#48484A'
                           />
                           <path
                              id='switchThemeBtnIcon'
                              d='M19.6067 11.1213C18.8345 10.3492 17.8969 9.8358 16.9126 9.57276C17.4472 11.5753 16.9338 13.7942 15.364 15.364C13.7943 16.9337 11.5754 17.4471 9.57283 16.9125C9.83587 17.8968 10.3492 18.8344 11.1214 19.6066C13.4633 21.9485 17.2647 21.9485 19.6067 19.6066C21.9486 17.2647 21.9486 13.4633 19.6067 11.1213Z'
                              fill='#E6E6E6'

                           />
                        </svg>
                     }
                  />
               </div>
               <img
                  className='precipitationIMG'
                  src={currentWeatherData.weatherImg}
                  alt='precipitationImage'
               />
               <div className='side-bar-content'>
                  <p className='temperature'>{currentWeatherData.temp}</p>
                  <p className='precipitation'>
                     {currentWeatherData.precipitation}
                  </p>
                  <p className='feelsLike'>
                     Ощущается как {currentWeatherData.feelsLike} °C
                  </p>
                  <div className='dateAndLocationInfo'>
                     <div className='dateInfo'>
                        <span className='today'>Сегодня</span>
                        <span className='date'>{currentFormattedDate}</span>
                     </div>
                     <figure className='locationInfo'>
                        <img src={locationLogo} alt='locationImage' />
                        <figcaption className='nameOfTheLocality'>
                           {cityData.city}
                        </figcaption>
                     </figure>
                  </div>
               </div>
            </>
         )}
         {isModalOpen ? (
            <SearchCityPanel
               closeModalWindow={handleModalWindow}
               getCityName={getCityData}
               historyOfSearching={historyOfSearching}
               setHistoryOfSearching={setHistoryOfSearching}
            />
         ) : (
            ""
         )}
      </section>
   );
};

export default Sidebar;
