import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWeather } from './WeatherSlice';
import { toggleFavorite } from './FavoriteSlice';
import { fetchForecast } from '../forecast/ForecastSlice';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { Card, ListGroup, Button, Toast } from 'react-bootstrap';
import Loader from '../../Loader';
import Search from './Search';
import Forecast from '../forecast/Forecast';

function Weather() {
  const dispatch = useDispatch()

  const weatherData = useSelector((state) => state.weather.weatherData);
  const isLoading = useSelector((state) => state.weather.isLoading);
  const error = useSelector((state) => state.weather.error);
  const favorites = useSelector((state) => state.favorite.data);

  const isFavorite = weatherData ? favorites.includes(weatherData) : false;

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    dispatch(fetchWeather("New York"))
    dispatch(fetchForecast("New York"))
  }, [dispatch])

  const handleClick = () => {
    if (weatherData) {
      dispatch(toggleFavorite({ data: weatherData }));
    }
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  if (isLoading) {
    <Loader />
  }

  if (error) {
    return (
      <>
        <Search />
        <div>Error: {error}</div>
      </>
    );
  }

  if (weatherData) {
    return (
      <>
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
          minWidth: '200px',
        }}>
          <Toast.Body>{isFavorite ? 'Added to favorites!' : 'Removed from favorites!'}</Toast.Body>
        </Toast>
        <Forecast />
      </>
    );
  }
}

export default Weather