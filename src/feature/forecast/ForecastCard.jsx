import React from 'react'
import { Col, Card, Container, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'

const ForecastCard = ({ forecast }) => {
  return (
    <Container>
      <Row>
        <Col>
          <Card style={{ backgroundColor: '#cccccc', width: '15rem', height: '25rem' }} >
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
  )
}

ForecastCard.propTypes = {
  forecast: PropTypes.shape({
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string,
        main: PropTypes.string,
        description: PropTypes.string
      })
    ),
    main: PropTypes.shape({
      temp: PropTypes.number,
      feels_like: PropTypes.number
    })
  }).isRequired
}

export default ForecastCard
