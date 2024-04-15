const getForecastImageForDay = (data) => {
   const middleIndex = Math.floor(data.length / 2 - 1);
   const middleElement = data[middleIndex];

   return `https://openweathermap.org/img/wn/${middleElement.weather[0].icon}@2x.png`;
};

export default getForecastImageForDay;