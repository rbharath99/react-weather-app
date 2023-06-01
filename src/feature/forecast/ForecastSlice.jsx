import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { FORECAST_BASE_URL, HOURLY_FORECAST_BASE_URL } from '../weather/WeatherConstants'

export const fetchForecast = createAsyncThunk('forecast/fetchForecast', async (city) => {
  const response = await axios.get(FORECAST_BASE_URL, {
    params: {
      q: city,
      units: 'Metric',
      lang: 'en'
    }
  })

  return response.data
})

export const fetchHourlyForecast = createAsyncThunk('forecast/fetchHourlyForecast', async (city) => {
  const response = await axios.get(HOURLY_FORECAST_BASE_URL, {
    params: {
      q: city,
      unitys: 'Metric',
      lang: 'en'
    }
  })

  return response.data
})

export const forecastSlice = createSlice({
  name: 'forecast',
  initialState: {
    forecastData: null,
    loading: false,
    error: '',
    isToggled: false
  },
  reducers: {
    toggleForecastData: (state, action) => {
      state.isToggled = !state.isToggled
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchForecast.pending, (state, action) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchForecast.fulfilled, (state, action) => {
      state.loading = false
      state.forecastData = action.payload
    })
    builder.addCase(fetchForecast.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
    builder.addCase(fetchHourlyForecast.pending, (state, action) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchHourlyForecast.fulfilled, (state, action) => {
      state.loading = false
      state.forecastData = action.payload
    })
    builder.addCase(fetchHourlyForecast.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  }
})

export const { toggleForecastData } = forecastSlice.actions
export default forecastSlice.reducer
