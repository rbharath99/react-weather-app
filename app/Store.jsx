import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from '../src/feature/weather/WeatherSlice';
import favoriteReducer from '../src/feature/weather/FavoriteSlice';

const store = configureStore({
    reducer: {
        weather: weatherReducer,
        favorite: favoriteReducer,
    }
});

export default store;