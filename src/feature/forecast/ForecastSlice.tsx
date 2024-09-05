import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { FORECAST_BASE_URL } from '../weather/WeatherConstants'
import { emptyForecast, Forecast } from '../../entities/Forecast';

interface ForecastState {
  forecastData: Forecast;
  loading: boolean;
  error: string | undefined;
}

const initialState: ForecastState = {
  forecastData: emptyForecast,
  loading: false,
  error: '',
}

export const fetchForecast = createAsyncThunk('forecast/fetchForecast', async (city: string) => {
  const response = await axios.get(FORECAST_BASE_URL, {
    params: {
      q: city,
      units: 'Metric',
      lang: 'en'
    }
  })

  return response.data
})

export const forecastSlice = createSlice({
  name: 'forecast',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchForecast.pending, (state, action) => {
      state.loading = true
      state.error = ''
    })
    builder.addCase(fetchForecast.fulfilled, (state, action) => {
      state.loading = false
      state.forecastData = action.payload
    })
    builder.addCase(fetchForecast.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  }
})

export default forecastSlice.reducer
