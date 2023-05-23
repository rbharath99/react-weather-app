import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from '../src/feature/weather/WeatherSlice';

const store = configureStore({
    reducer: {
        weather: weatherReducer,
    }
});

export default store;