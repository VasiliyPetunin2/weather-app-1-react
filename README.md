# weather-app-1-react

Приложение показывает прогноз погоды по указанной локации:

1. Локация ищется с помощью **API** сервиса *nominatim.openstreetmap.org*
2. Данные о погоде получаются по данным ранее полученной локации с помощью **API** сервиса *openweathermap.org*
3. Используется **контекст** для лоадера, блока ошибки и данных локации
4. Для сохранения данных используется **localStorage**
5. Адаптивная и резиновая вёрстка реализована с помощью **Flexbox** и **медиавыражений**

## Установка и запуск
1. Скачиваем исходный код локально с помощью кнопки **"Code"** в интерфейсе GH и предпочтитаемого способа из трёх (HTTPS, SSH, GitHub CLI):  
1.1 `https://github.com/VasiliyPetunin2/weather-app-1-react.git`  
1.2 `git@github.com:VasiliyPetunin2/weather-app-1-react.git`  
1.3 `gh repo clone VasiliyPetunin2/weather-app-1-react`
2. Регистрируемся и получаем ключ к **API** сервиса *[openweathermap.org](https://openweathermap.org/)*
3. В корневой директории **weather-app-1-react** создаём файл **.env** и вставляем в него следующее содержимое:  
3.1 `REACT_APP_OPEN_WEATHER_API_KEY=*ВАШ КЛЮЧ ОТ API*`
4. Заходим в корневую директорию **weather-app-1-react** и устанавливаем зависимости следующей командой в терминале:  
4.1 `npm install`
5. Для запуска **dev-сборки** используем следующую команду в терминале:  
5.1 `npm run start`
