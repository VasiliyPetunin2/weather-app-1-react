const getConvertedUnixToRussianTimeShort = (unixTimestamp, timezone) => {
   const offset = timezone * 1000;
   const date = new Date(unixTimestamp * 1000 + offset);

   const options = {
      hour: "2-digit",
      minute: "2-digit",
   };

   return date.toLocaleString("ru-RU", options);
};

export default getConvertedUnixToRussianTimeShort;
