const getCurrentFormattedDate = () => {
   const daysOfWeek = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
   const months = [
      "янв",
      "фев",
      "мар",
      "апр",
      "мая",
      "июн",
      "июл",
      "авг",
      "сен",
      "окт",
      "ноя",
      "дек",
   ];

   const currentDate = new Date();
   const dayOfWeek = daysOfWeek[currentDate.getDay()];
   const day = currentDate.getDate();
   const month = months[currentDate.getMonth()];

   return `${dayOfWeek}, ${day} ${month}`;
};

export default getCurrentFormattedDate;
