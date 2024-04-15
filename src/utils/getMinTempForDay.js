const getMinTempForDay = (data) => {
    let lowestTemp = Infinity;
 
    data.forEach((elem) => {
       const temperature = elem.main.temp_min;
 
       if (temperature < lowestTemp) {
          lowestTemp = temperature;
       }
    });
 
    return lowestTemp;
 };

 export default getMinTempForDay;