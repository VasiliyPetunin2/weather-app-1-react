const getConvertUnixToRussianDayAndDate = (unixTimestamp, timezone) => {
   const daysOfWeek = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
   const months = [
      "янв",
      "фев",
      "мар",
      "апр",
      "май",
      "июн",
      "июл",
      "авг",
      "сен",
      "окт",
      "ноя",
      "дек",
   ];

   const offset = timezone * 1000; // Convert seconds to milliseconds
   const date = new Date(unixTimestamp * 1000); // Convert unixTimestamp to Date

   // Apply offset after converting to Date
   date.setTime(date.getTime() + offset);

   const today = new Date();
   const tomorrow = new Date();
   tomorrow.setDate(tomorrow.getDate() + 1);

   if (
      date.getUTCDate() === today.getUTCDate() &&
      date.getUTCMonth() === today.getUTCMonth() &&
      date.getUTCFullYear() === today.getUTCFullYear()
   ) {
      return "Сегодня";
   } else if (
      date.getUTCDate() === tomorrow.getUTCDate() &&
      date.getUTCMonth() === tomorrow.getUTCMonth() &&
      date.getUTCFullYear() === tomorrow.getUTCFullYear()
   ) {
      return "Завтра";
   }

   const dayOfWeek = daysOfWeek[date.getUTCDay()];
   const dayOfMonth = date.getUTCDate();
   const month = months[date.getUTCMonth()];

   return `${dayOfWeek}, ${dayOfMonth} ${month}`;
};

export default getConvertUnixToRussianDayAndDate;
