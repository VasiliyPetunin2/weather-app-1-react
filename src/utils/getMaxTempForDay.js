const getMaxTempForDay = (data) => {
   let highestTemp = -Infinity;

   data.forEach((elem) => {
      const temperature = elem.main.temp_max;

      if (temperature > highestTemp) {
         highestTemp = temperature;
      }
   });

   return highestTemp;
};

export default getMaxTempForDay;