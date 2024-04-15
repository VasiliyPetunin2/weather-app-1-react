const getForecastDataByDays = (data) => {
   const forecastDataByDays = {};

   data.forEach((elem) => {
      const date = elem.dt_txt.split(" ")[0];

      if (!forecastDataByDays[date]) {
         forecastDataByDays[date] = [];
      }

      forecastDataByDays[date].push(elem);
   });

   return forecastDataByDays;
};

export default getForecastDataByDays;
