import React, { useState } from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux'
import { fetchWeather } from './WeatherSlice';
import { fetchForecast } from '../forecast/ForecastSlice';

function Search() {
    const [city, setCity] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(fetchWeather(city));
        dispatch(fetchForecast(city));
        setCity('');
    };
    return (
        <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Enter City Name"
                    aria-label="Search for Weather"
                    type="text"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                />
                <Button type="submit" disabled={!city} variant="primary" >
                    Search
                </Button>
            </InputGroup>
        </Form>
    );
}

export default Search;