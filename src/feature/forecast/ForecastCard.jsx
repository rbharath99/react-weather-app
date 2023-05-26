import React from 'react'

const ForecastCard = ({ forecast }) => {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Temperature: {forecast.main.temp}</h5>
          <h6 className="card-subtitle mb-2 text-muted">Feels Like: {forecast.main.feels_like}</h6>
          <p className="card-text">Weather: {forecast.weather[0].main}</p>
          <p className="card-text">Description: {forecast.weather[0].description}</p>
        </div>
      </div>
    );
  };
  

export default ForecastCard;