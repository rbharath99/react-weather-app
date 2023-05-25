import React from 'react'

function ForecastCard({ forecast }) {
    return (
        <>
            <p>{forecast.main.temp}</p>
            <p>{forecast.main.feels_like}</p>
            <p>{forecast.weather[0].main}</p>
            <p>{forecast.weather[0].description}</p>
        </>
    );
}

export default ForecastCard;