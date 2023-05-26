import React, { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap';
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
            <Row className="align-items-center">
                <Col xs={9} md={8} lg={6}>
                    <Form.Control
                        type="text"
                        value={city}
                        onChange={(event) => setCity(event.target.value)}
                        placeholder="Enter city name"
                    />
                </Col>
                <Col xs={3} md={4} lg={6}>
                    <Button type="submit" disabled={!city} variant="primary">Search</Button>
                </Col>
            </Row>
        </Form>
    );
}

export default Search;