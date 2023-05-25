import React from 'react'
import { useSelector } from 'react-redux'
import ForecastCard from './ForecastCard';

function Forecast() {
    const forecastData = useSelector((state) => state.forecast.forecastData);
    const isLoading = useSelector((state) => state.forecast.isLoading);
    console.log(forecastData)

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (forecastData) {
        return (
            <>
                <div className='forecast-card-layout'>
                    {forecastData.list.map((forecast) => {
                        return <ForecastCard forecast={forecast} key={forecast.dt}></ForecastCard>
                    })}
                </div>
            </>
        );
    }

}

export default Forecast;