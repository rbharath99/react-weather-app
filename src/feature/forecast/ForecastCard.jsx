import React from 'react'
import { Col, Card } from 'react-bootstrap';

const ForecastCard = ({ forecast }) => {
  return (
    <Card>
      <Col xs={9} md={8} lg={6}>
        <div className="card-body">
          <h5 className="card-title">Temperature: {forecast.main.temp}</h5>
          <h6 className="card-subtitle mb-2 text-muted">Feels Like: {forecast.main.feels_like}</h6>
          <p className="card-text">Weather: {forecast.weather[0].main}</p>
          <p className="card-text">Description: {forecast.weather[0].description}</p>
        </div>
      </Col>
    </Card>
  );
};


export default ForecastCard;