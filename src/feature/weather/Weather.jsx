import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWeatherByCoordinates } from './WeatherSlice'
import { toggleFavorite } from './FavoriteSlice'
import { fetchForecast } from '../forecast/ForecastSlice'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { Card, ListGroup, Button, Toast, Container } from 'react-bootstrap'
import Graph from '../graph/Graph'
import Loader from '../../Loader'
import Search from './Search'
import Forecast from '../forecast/Forecast'

function Weather () {
  const dispatch = useDispatch()
  const { weatherData, isLoading, error } = useSelector((state) => state.weather)
  const favorites = useSelector((state) => state.favorite.data)
  const isFavorite = weatherData ? favorites.includes(weatherData) : false
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    const fallbackCoordinates = {
      latitude: 40.7128,
      longitude: -74.0060
    }
    if (navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          if (location) {
            const { latitude, longitude } = location.coords
            dispatch(fetchWeatherByCoordinates({ latitude, longitude }))
          } else {
            dispatch(fetchWeatherByCoordinates(fallbackCoordinates))
          }
        },
        () => {
          dispatch(fetchWeatherByCoordinates(fallbackCoordinates))
        }
      )
    }
  }, [])

  useEffect(() => {
    if (weatherData && weatherData.name) {
      dispatch(fetchForecast(weatherData.name))
    } else {
      dispatch(fetchForecast('New York'))
    }
  }, [weatherData, dispatch])

  const handleClick = () => {
    if (weatherData) {
      dispatch(toggleFavorite({ data: weatherData }))
    }
    setShowToast(true)
    setTimeout(() => {
      setShowToast(false)
    }, 3000)
  }

  if (isLoading) {
    <Loader />
  }

  if (error) {
    return (
      <>
        <Search />
        <div>Error: {error}</div>
      </>
    )
  }

  if (weatherData) {
    return (
      <Container style={{ paddingTop: '20px' }}>
        <Search />
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <b>{weatherData.name}</b>
            </ListGroup.Item>
            <ListGroup.Item>
              <b>Feels Like</b> {JSON.stringify(weatherData.main.temp)}
            </ListGroup.Item>
            <ListGroup.Item>
              <b>Min Temp</b> {JSON.stringify(weatherData.main.temp_min)}
            </ListGroup.Item>
            <ListGroup.Item>
              <b>Max Temp</b> {JSON.stringify(weatherData.main.temp_max)}
            </ListGroup.Item>
            <ListGroup.Item>
              <b>Pressure</b> {JSON.stringify(weatherData.main.pressure)}
            </ListGroup.Item>
            <ListGroup.Item>
              <b>Humidity</b> {JSON.stringify(weatherData.main.humidity)}
            </ListGroup.Item>
          </ListGroup>
          <Card.Footer className="d-flex justify-content-center">
            <Button variant="primary" onClick={handleClick}>
              {isFavorite ? <AiFillStar size={24} /> : <AiOutlineStar size={24} />}
            </Button>
          </Card.Footer>
        </Card>
        <Toast show={showToast} onClose={() => setShowToast(false)} style={{
          position: 'fixed',
          bottom: '1rem',
          right: '1rem',
          minWidth: '200px'
        }}>
          <Toast.Body>{isFavorite ? 'Added to favorites!' : 'Removed from favorites!'}</Toast.Body>
        </Toast>
        <Graph />
        <Forecast />
      </Container>
    )
  }
}

export default Weather
