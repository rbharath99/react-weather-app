import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWeather } from './WeatherSlice';

function Weather() {
  const dispatch = useDispatch()

  const weatherData = useSelector((state) => state.weather.data);
  const isLoading = useSelector((state) => state.weather.isLoading);
  const error = useSelector((state) => state.weather.error);

  useEffect(() => {
    dispatch(fetchWeather())
  }, [dispatch])

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (weatherData) {
    return (
      <>
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
      </>

    );
  }

}

export default Weather