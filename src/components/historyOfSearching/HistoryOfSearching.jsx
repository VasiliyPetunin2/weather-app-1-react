import './HistoryOfSearching.css';
import './HistoryOfSearchingDark.css';
import React from 'react';
import Button from 'components/common/button/Button';

const HistoryOfSearching = ({ historyOfSearching, getCityLocation, removeModalWindow }) => {

    const handleSubmit = (cityName) => {
        getCityLocation(cityName);
        removeModalWindow();
    }

    return (
        <section className='historyOfSearching'>
            <ul className='historyOfSearchingList'>
                {historyOfSearching.map( cityName => 
                    <li key={cityName}>
                        <Button classes={['btn', 'btn-historyOfSearching']} onClickFunc={() => handleSubmit(cityName)} content={cityName}/>
                    </li>
                )}
            </ul>
        </section>
    );
};

export default HistoryOfSearching;