import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from '../src/feature/weather/WeatherSlice';
import favoriteReducer from '../src/feature/weather/FavoriteSlice';
import forecastReducer from '../src/feature/forecast/ForecastSlice';

const store = configureStore({
    reducer: {
        weather: weatherReducer,
        favorite: favoriteReducer,
        forecast: forecastReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;