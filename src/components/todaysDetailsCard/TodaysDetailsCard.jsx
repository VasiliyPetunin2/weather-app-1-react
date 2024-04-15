import "./TodaysDetailsCard.css";
import "./TodaysDetailsCardDark.css";
import React, { useState, useEffect } from "react";
import LoadIndicator from "components/common/loadIndicator/LoadIndicator";
import { useLoading } from "hooks/useLoading";
import windIMG from "../../assets/images/todaysDetailsCards/wind.svg";

const TodaysDetailsCard = ({ data }) => {
   const [letterCount, setLetterCount] = useState(0);

   const { isLoading } = useLoading();

   useEffect(() => {
      setLetterCount(data.unitsOfMeasure.split("").length);
   }, [data.unitsOfMeasure]);

   const setImage = () => {
      if (data.specifics.img === "wind.svg") return windIMG;
   };

   return (
      <article className='todaysDetailsCard'>
         {isLoading ? (
            <LoadIndicator />
         ) : (
            <>
               <h3 className='todaysDetailsCardsTitle'>{data.title}</h3>
               <p className='todaysDetailsCardsTextBold'>
                  {data.value}
                  <span
                     className={
                        "todaysDetailsCardsUnitsOfMeasure" +
                        (letterCount > 4
                           ? " todaysDetailsCardsUnitsOfMeasureTextSmaller"
                           : "")
                     }
                  >
                     {data.unitsOfMeasure}
                  </span>
               </p>

               {data.title === "Влажность" ? (
                  <div className='progress-container'>
                     <div className='progress-labels'>
                        <span className='progress-label'>0</span>
                        <span className='progress-label'>50</span>
                        <span className='progress-label'>100</span>
                     </div>
                     <div className='progress'>
                        <div
                           className='progress-active'
                           style={{
                              transition: "width 0.5s",
                              width: `${data.value}%`,
                           }}
                        ></div>
                     </div>
                     <span className='progress-label progress-label-percent'>
                        %
                     </span>
                  </div>
               ) : (
                  ""
               )}

               {data.specifics ? (
                  <figure className='todaysDetailsCardsWind'>
                     <img
                        src={setImage()}
                        alt='windImage'
                        style={{ transform: `rotate(${data.specifics.degrees}deg)`}}
                     />
                     <figcaption className='todaysDetailsCardsWindDirection'>
                        {data.specifics.imgCaption}
                     </figcaption>
                  </figure>
               ) : (
                  ""
               )}
            </>
         )}
      </article>
   );
};

export default TodaysDetailsCard;
