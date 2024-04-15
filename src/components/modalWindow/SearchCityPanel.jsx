import "./SearchCityPanel.css";
import "./SearchCityPanelDark.css";
import React, { useEffect, useState, useRef } from "react";
import Button from "components/common/button/Button";
import Input from "components/common/input/Input.jsx";
import HistoryOfSearching from "components/historyOfSearching/HistoryOfSearching";
import Alert from "components/common/alert/Alert";
import { useCityData } from "hooks/useCityData";
import { useAlert } from "hooks/useAlert";
import { isValidInputValue } from "utils/isValidInputValue";
import { isInputValueAllowed } from "utils/isValidInputValue";

const SearchCityPanel = ({
   closeModalWindow,
   getCityName,
   historyOfSearching,
   setHistoryOfSearching,
}) => {
   const [formSearchCityData, setFormSearchCityData] = useState({ city: "" });
   const { cityData } = useCityData();
   const { isAlert, setIsAlert } = useAlert();
   const panelOpenedWithoutRequesting = useRef(true);

   useEffect(() => {
      setTimeout(() => {
         document
            .querySelector(".searchCityPanel")
            .classList.add("openedSearchCityPanel");
      }, 0);
   }, []);
   useEffect(() => {
      if (!historyOfSearching.includes(cityData.city)) {
         setHistoryOfSearching((prevHistoryOfSearching) => {
            const newHistoryOfSearching = [
               cityData.city,
               ...prevHistoryOfSearching,
            ];
            localStorage.setItem(
               "historyOfSearching",
               JSON.stringify(newHistoryOfSearching)
            );
            return newHistoryOfSearching;
         });
      } else {
         setHistoryOfSearching((prevHistoryOfSearching) => {
            const newHistoryOfSearching = [
               cityData.city,
               ...prevHistoryOfSearching.filter(
                  (searchedCityName) => searchedCityName !== cityData.city
               ),
            ];
            localStorage.setItem(
               "historyOfSearching",
               JSON.stringify(newHistoryOfSearching)
            );
            return newHistoryOfSearching;
         });
      }
   }, []);
   useEffect(() => {
      if (panelOpenedWithoutRequesting.current) {
         panelOpenedWithoutRequesting.current = false;
         return;
      }

      if (!isAlert.active && isAlert.isRequested) {
         removeModalWindow();
      }
   }, [isAlert]);

   const removeModalWindow = () => {
      document
         .querySelector(".searchCityPanel")
         .classList.remove("openedSearchCityPanel");
      setTimeout(() => closeModalWindow(), 500);
   };

   const handleChange = (e) => {
      if (isValidInputValue(e.target.value)) {
         setIsAlert({
            active: false,
            isRequested: false,
            error: "",
         });
         setFormSearchCityData({ city: e.target.value });
      } else if (e.target.value === "") {
         setIsAlert({
            active: false,
            isRequested: false,
            error: "",
         });
      } else {
         setIsAlert({
            active: true,
            isRequested: false,
            error: "Для ввода доступны только кириллица и тире!",
         });
      }
   };
   const searchCity = (e) => {
      e.preventDefault();
      if (isValidInputValue(formSearchCityData.city) && isInputValueAllowed(formSearchCityData.city)) {
         getCityName(formSearchCityData.city);
         setFormSearchCityData({ city: "" });
      }  else if (!isInputValueAllowed(formSearchCityData.city)) {
         setIsAlert({
            active: true,
            isRequested: false,
            error: `"${formSearchCityData.city}" не допускается к вводу! Попробуйте написать полное название города или выберите другой город`,
         });
      }  else if (formSearchCityData.city === "") {
         setIsAlert({
            active: true,
            isRequested: false,
            error: "Введите название города!",
         });
      } else {
         setIsAlert({
            active: true,
            isRequested: false,
            error: "Название города может содержать только кириллицу и тире!",
         });
      }
   };

   return (
      <section className='searchCityPanel'>
         <div className='searchCityPanelContent'>
            <Button
               classes={["btn-closeSearchCityPanel"]}
               onClickFunc={removeModalWindow}
               attributes={{
                  "aria-label": "Закрыть панель поиска",
               }}
               content={
                  <svg
                     xmlns='http://www.w3.org/2000/svg'
                     width='26'
                     height='26'
                     viewBox='0 0 26 26'
                     fill='#48484A'
                     className='btn-closeSearchCityPanelIMG'
                  >
                     <path d='M26 2.61857L23.3814 0L13 10.3814L2.61857 0L0 2.61857L10.3814 13L0 23.3814L2.61857 26L13 15.6186L23.3814 26L26 23.3814L15.6186 13L26 2.61857Z' />
                  </svg>
               }
            />
            <form onSubmit={searchCity} className='form-searchCityPanel'>
               <Input
                  classes={["textFieldSearchCityPanel"]}
                  attributes={{
                     type: "search",
                     id: "nameOfTheSearchingCity",
                     name: "searchingCity",
                  }}
                  defaultValue={formSearchCityData.city}
                  onChangeFunc={handleChange}
               />
               <Input
                  classes={["btn"]}
                  attributes={{
                     type: "submit",
                     value: "Найти",
                  }}
               />
            </form>
            {isAlert.active ? <Alert error={isAlert.error} /> : ""}
            {historyOfSearching.length ? (
               <HistoryOfSearching
                  historyOfSearching={historyOfSearching}
                  getCityLocation={getCityName}
                  removeModalWindow={removeModalWindow}
               />
            ) : (
               ""
            )}
         </div>
      </section>
   );
};

export default SearchCityPanel;
