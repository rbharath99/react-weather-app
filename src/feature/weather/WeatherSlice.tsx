import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL } from './WeatherConstants'
import { emptyWeather, Weather } from '../../entities/Weather';

interface WeatherState {
  weatherData: Weather;
  loading: boolean;
  error: string | undefined;
}

const initialState: WeatherState = {
  weatherData: emptyWeather,
  loading: false,
  error: '',
}

export interface LocationProps {
  latitude: number;
  longitude: number;
}

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (city: string) => {
  const response = await axios.get(BASE_URL, {
    params: {
      q: city,
      units: 'Metric',
      lang: 'en'
    }
  })
  return response.data
})

export const fetchWeatherByCoordinates = createAsyncThunk('weather/fetchWeatherByCoordinates', async ({ latitude, longitude }: LocationProps) => {
  const response = await axios.get(BASE_URL, {
    params: {
      lat: latitude,
      lon: longitude,
      units: 'Metric',
      lang: 'en'
    }
  })
  return response.data
})

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.pending, (state, action) => {
      state.loading = true
      state.error = ''
    })
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      state.loading = false
      state.weatherData = action.payload
    })
    builder.addCase(fetchWeather.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
    builder.addCase(fetchWeatherByCoordinates.pending, (state, action) => {
      state.loading = true
      state.error = ''
    })
    builder.addCase(fetchWeatherByCoordinates.fulfilled, (state, action) => {
      state.loading = false
      state.weatherData = action.payload
    })
    builder.addCase(fetchWeatherByCoordinates.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  }
})

export default weatherSlice.reducer
