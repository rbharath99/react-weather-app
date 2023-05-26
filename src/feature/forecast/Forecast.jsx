import React from 'react'
import { useSelector } from 'react-redux'
import ForecastCard from './ForecastCard';

function Forecast() {
    const forecastData = useSelector((state) => state.forecast.forecastData);
    const isLoading = useSelector((state) => state.forecast.isLoading);
    console.log(forecastData)

    if (isLoading) {
        return (
            <div className="text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (forecastData) {
        return (
            <div className="container">
                <div className="d-flex flex-wrap justify-content-center">
                    {forecastData.list.map((forecast) => (
                        <div className="p-2" key={forecast.dt}>
                            <ForecastCard forecast={forecast} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

}

export default Forecast;