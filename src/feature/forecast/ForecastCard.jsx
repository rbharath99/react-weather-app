import React from 'react'
import { Col, Card, Container, Row } from 'react-bootstrap';

const ForecastCard = ({ forecast }) => {
  return (
    <Container style={{ width: '18rem', height: '30rem' }}>
      <Row>
        <Col>
          <Card style={{ backgroundColor: '#cccccc' }} >
            <Card.Body>
              <Card.Img
                variant="top"
                src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                style={{ width: '100px', height: '100px' }}
              />
              <Card.Title>Temperature: {forecast.main.temp}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Feels Like: {forecast.main.feels_like}
              </Card.Subtitle>
              <Card.Text>Weather: {forecast.weather[0].main}</Card.Text>
              <Card.Text>Description: {forecast.weather[0].description}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};


export default ForecastCard;