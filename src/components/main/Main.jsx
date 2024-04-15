import React, { useState, useEffect } from 'react';
import './Main.css';
import './MainDark.css';
import Button from 'components/common/button/Button';
import Slider from 'components/slider/Slider';
import TodaysDetailsCard from 'components/todaysDetailsCard/TodaysDetailsCard';
import { getWindDirectionName } from 'utils/getWindDirectionName';

function Main({ currentWeatherData }) {

  const [predictionsType, setPredictionsType] = useState('weekly');
  const [isTabActive, setTabActive] = useState(true);

  const [todaysDetailsCardsData, setTodaysDetailsCardsData] = useState([]);

  useEffect(() => {
    setTodaysDetailsCardsData(
      [
        {
          'title': 'Скорость ветра',
          'value': currentWeatherData.windSpeed,
          'unitsOfMeasure': 'м/с',
          'specifics': {
            'img': 'wind.svg',
            'degrees': currentWeatherData.windDirectionDeg,
            'imgCaption': getWindDirectionName(currentWeatherData.windDirectionDeg)
          }
        },
        {
          'title': 'Влажность',
          'value': currentWeatherData.humidity,
          'unitsOfMeasure': '%'
        },
        {
          'title': 'Видимость',
          'value': currentWeatherData.visibility,
          'unitsOfMeasure': 'км'
        },
        {
          'title': 'Давление',
          'value': currentWeatherData.pressure,
          'unitsOfMeasure': 'мм рт. ст.'
        }
      ]
    )
  }, [currentWeatherData])

  const handlePredictionsType = e => {
    if (e.target.getAttribute('data-time-duration') !== predictionsType) {
      setTabActive(!isTabActive);
      setPredictionsType(e.target.getAttribute('data-time-duration'));
    }
  }

  return (
      <div className='content-container'>
        <div className='content'>
          <section className='predictionBlock'>
            <header className="predictionHeader">
              <h2 className="predictionTitle">Прогноз</h2>
              <nav className="predictionTabs">
                <Button classes={['predictionTab', `${isTabActive ? 'predictionTabActive' : ''}`]} 
                      attributes={{
                        'data-time-duration': 'weekly'
                      }} 
                      onClickFunc={handlePredictionsType}
                      content={`на неделю`}
                />
                <Button classes={['predictionTab', `${!isTabActive ? 'predictionTabActive' : ''}`]} 
                      attributes={{
                        'data-time-duration': 'hourly'
                      }}
                      onClickFunc={handlePredictionsType}
                      content={'почасовой'}
                />
              </nav>
            </header>
            <Slider type={predictionsType} />
          </section>
          <section className='todaysDetailsBlock'>
            <h2 className='todaysDetailsTitle'>Подробно на сегодня</h2>
            <div className='todaysDetailsCards'>
              {todaysDetailsCardsData.length !== 0
              ? todaysDetailsCardsData.map( todaysDetailsCardData => <TodaysDetailsCard key={todaysDetailsCardData.title} data={todaysDetailsCardData} />)
              : '' }
            </div>
          </section>
        </div>
      </div>
  );
}

export default Main;
