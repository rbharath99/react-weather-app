import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWeather } from './WeatherSlice';
import { toggleFavorite } from './FavoriteSlice';
import { fetchForecast } from '../forecast/ForecastSlice';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import Search from './Search';
import Forecast from '../forecast/Forecast';

function Weather() {
  const dispatch = useDispatch()

  const weatherData = useSelector((state) => state.weather.weatherData);
  const isLoading = useSelector((state) => state.weather.isLoading);
  const error = useSelector((state) => state.weather.error);
  const favorites = useSelector((state) => state.favorite.data);

  const isFavorite = weatherData ? favorites.includes(weatherData) : false;

  useEffect(() => {
    dispatch(fetchWeather("New York"))
    dispatch(fetchForecast("New York"))
  }, [dispatch])

  const handleClick = () => {
    if (weatherData) {
      dispatch(toggleFavorite({ data: weatherData }));
    }
  };

  if (isLoading) {
    return <div>Loading...</div>
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
        <div>{JSON.stringify(weatherData.name)}</div>
        <ul className="list">
          <li>
            <b>Feels Like</b> {JSON.stringify(weatherData.main.temp)}
          </li>
          <li>
            <b>Min Temp</b> {JSON.stringify(weatherData.main.temp_min)}
          </li>
          <li>
            <b>Max Temp</b> {JSON.stringify(weatherData.main.temp_max)}
          </li>
          <li>
            <b>Pressure</b> {JSON.stringify(weatherData.main.pressure)}
          </li>
          <li>
            <b>Humidity</b> {JSON.stringify(weatherData.main.humidity)}
          </li>
        </ul>
        <button onClick={handleClick}>
          {isFavorite ? <AiFillStar size={24} /> : <AiOutlineStar size={24} />}
        </button>
        <Forecast></Forecast>
      </>

    );
  }

}

export default Weather