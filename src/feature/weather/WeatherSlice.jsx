import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "./WeatherConstants";

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (city) => {
    const response = await axios.get(BASE_URL, {
        params: {
            q: city,
            units: "Metric",
            lang: "en"
        }
    });
    return response.data;
});

export const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        weatherData: null,
        loading: false,
        error: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchWeather.pending, (state, action) => {
            state.loading = true
            state.error = null;
        })
        builder.addCase(fetchWeather.fulfilled, (state, action) => {
            state.loading = false
            state.weatherData = action.payload
        })
        builder.addCase(fetchWeather.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})

export default weatherSlice.reducer;