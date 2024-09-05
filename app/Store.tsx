import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from "react-redux";
import weatherReducer from '../src/feature/weather/WeatherSlice'
import favoriteReducer from '../src/feature/favorites/FavoriteSlice'
import forecastReducer from '../src/feature/forecast/ForecastSlice'
import locationReducer from '../src/feature/location/LocationSlice'

export const store = configureStore({
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

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch