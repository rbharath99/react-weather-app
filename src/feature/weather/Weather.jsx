import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWeather } from './WeatherSlice';
import { toggleFavorite } from './FavoriteSlice';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

function Weather() {
  const dispatch = useDispatch()

  const weatherData = useSelector((state) => state.weather.data);
  const isLoading = useSelector((state) => state.weather.isLoading);
  const error = useSelector((state) => state.weather.error);
  const isFavorite = useSelector((state) => state.favorite.isFavorite);

  useEffect(() => {
    dispatch(fetchWeather())
  }, [dispatch])

  const handleClick = () => {
    dispatch(toggleFavorite());
  }

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
        <button onClick={handleClick}>
          {isFavorite ? <AiFillStar size={24} /> : <AiOutlineStar size={24} />}
        </button>
      </>

    );
  }

}

export default Weather