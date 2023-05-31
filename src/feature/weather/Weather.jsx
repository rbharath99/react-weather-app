import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWeather, fetchWeatherByCoordinates } from './WeatherSlice'
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

  const storedLatitude = localStorage.getItem('latitude')
  const storedLongitude = localStorage.getItem('longitude')

  const [latitude, setLatitude] = useState(storedLatitude ? parseFloat(storedLatitude) : null)
  const [longitude, setLongitude] = useState(storedLongitude ? parseFloat(storedLongitude) : null)

  const geolocationAPI = navigator.geolocation
  // const getUserCoordinates = () => {
  //   if (!geolocationAPI) {
  //     setLatitude(null)
  //     setLongitude(null)
  //     localStorage.setItem('latitude', null)
  //     localStorage.setItem('longitude', null)
  //   } else {
  //     geolocationAPI.getCurrentPosition((position) => {
  //       const { coords } = position
  //       setLatitude(coords.latitude)
  //       setLongitude(coords.longitude)
  //     }, (error) => {
  //       console.log(error)
  //     })
  //   }
  // }

  const getUserCoordinates = () => {
    if (!geolocationAPI) {
      setLatitude(null)
      setLongitude(null)
      localStorage.removeItem('latitude') // Remove the stored latitude value
      localStorage.removeItem('longitude') // Remove the stored longitude value
    } else {
      geolocationAPI.getCurrentPosition(
        (position) => {
          const { coords } = position
          setLatitude(coords.latitude)
          setLongitude(coords.longitude)
          localStorage.setItem('latitude', coords.latitude.toString()) // Store the latitude value
          localStorage.setItem('longitude', coords.longitude.toString()) // Store the longitude value
        },
        (error) => {
          console.log(error)
          setLatitude(null)
          setLongitude(null)
          localStorage.removeItem('latitude') // Remove the stored latitude value
          localStorage.removeItem('longitude') // Remove the stored longitude value
        }
      )
    }
  }

  const isFavorite = weatherData ? favorites.includes(weatherData) : false

  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    getUserCoordinates()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (latitude && longitude) {
          localStorage.setItem('latitude', latitude.toString())
          localStorage.setItem('longitude', longitude.toString())
          dispatch(fetchWeatherByCoordinates({ latitude, longitude }))
          if (!weatherData?.name) {
            dispatch(fetchForecast('New York'))
          }
          console.log('Weather data fetched for coordinates:', latitude, longitude)
        } else {
          console.log('Coordinates not available, fallback to default')
          dispatch(fetchWeather('New York'))
          dispatch(fetchForecast('New York'))
        }
      } catch (error) {
        console.log('Error:', error)
      }
    }

    fetchData()
  }, [latitude, longitude, weatherData, dispatch])

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
