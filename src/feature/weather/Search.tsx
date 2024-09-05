import React, { useState } from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { fetchForecast } from '../forecast/ForecastSlice';
import { fetchWeather } from './WeatherSlice';
import { AppDispatch } from '../../../app/Store';

function Search() {
  const [city, setCity] = useState<string>('')
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (event: any) => {
    event.preventDefault()
    dispatch(fetchWeather(city))
    dispatch(fetchForecast(city))
    setCity('')
  }
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
  )
}

export default Search
