import { configureStore } from '@reduxjs/toolkit'
import weatherReducer from '../src/feature/weather/WeatherSlice'
import favoriteReducer from '../src/feature/weather/FavoriteSlice'
import forecastReducer from '../src/feature/forecast/ForecastSlice'
import locationReducer from '../src/feature/location/LocationSlice'

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    favorite: favoriteReducer,
    forecast: forecastReducer,
    location: locationReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export default store
