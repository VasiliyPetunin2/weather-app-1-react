export const getWindDirectionName = (degrees) => {
   const directions = ["С", "СВ", "В", "ЮВ", "Ю", "ЮЗ", "З", "СЗ"];
   const index = Math.round((degrees % 360) / 45) % 8;
   return directions[index];
};
