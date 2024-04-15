import "./SliderCard.css";
import "./SliderCardDark.css";
import React from "react";
import LoadIndicator from "components/common/loadIndicator/LoadIndicator";

const SliderCard = ({ predictionData, isLoading }) => {
   return (
      <li className='sliderCardsItem'>
         {isLoading ? (
            <LoadIndicator />
         ) : (
            <>
               <article
                  key={
                     predictionData.date
                        ? predictionData.date
                        : predictionData.time
                  }
                  className='sliderCard'
               >
                  <p className='sliderCardText'>
                     {predictionData.date
                        ? predictionData.date
                        : predictionData.time}
                  </p>
                  <img
                     src={predictionData.img}
                     alt={predictionData.imgDescription}
                     className='sliderCardImg'
                  />

                  {predictionData.date && (
                     <>
                        <div className='sliderCardTemperature'>
                           <span className='sliderCardText'>
                              {predictionData.temperature &&
                                 predictionData.temperature.atDay}
                           </span>
                           <span className='sliderCardText sliderCardTextTransparent'>
                              {predictionData.temperature &&
                                 predictionData.temperature.atNight}
                           </span>
                        </div>
                     </>
                  )}

                  {predictionData.time && (
                     <p className='sliderCardText'>
                        {predictionData.temperature}
                     </p>
                  )}
               </article>
            </>
         )}
      </li>
   );
};

export default SliderCard;
