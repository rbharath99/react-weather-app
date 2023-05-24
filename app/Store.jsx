import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from '../src/feature/weather/WeatherSlice';
import favoriteReducer from '../src/feature/weather/FavoriteSlice';

const store = configureStore({
    reducer: {
        weather: weatherReducer,
        favorite: favoriteReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;