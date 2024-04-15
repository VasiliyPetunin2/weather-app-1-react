const regexForSearchingCityInput = /^[а-яА-ЯёЁ-]/;
const forbiddenValues = [
  "мос",
  "мосс",
  "Мосс",
  "Мос",
  "мо",
  "Мо",
  "МО",
  "нск",
  "Нск",
  "НСК",
];

export const isValidInputValue = (valueToValidate) => {
  if (!regexForSearchingCityInput.test(valueToValidate)) {
    return false;
  }
  return true;
};

export const isInputValueAllowed = (value) => {
  if (forbiddenValues.includes(value)) {
    return false;
  }
  return true;
};
