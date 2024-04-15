import capitalizeFirstLetter from "./capitalizeFirstLetter";

const getForecastImageDescriptionForDay = (data) => {
    const middleIndex = Math.floor(data.length / 2 - 1);
    const middleElement = data[middleIndex];
 
    return capitalizeFirstLetter(middleElement.weather[0].description);
 };
 
 export default getForecastImageDescriptionForDay;