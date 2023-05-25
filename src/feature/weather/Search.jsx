import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWeather } from './WeatherSlice';

function Search() {
    const [city, setCity] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(fetchWeather(city));
        setCity('');
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    placeholder="Enter city name"
                />
                <button type="submit" disabled={!city}>Search</button>
            </form>
        </>
    );
}

export default Search;