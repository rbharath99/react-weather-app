export interface Weather {
    coord: Coord;
    weather: WeatherElement[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

export interface Clouds {
    all: number;
}

export interface Coord {
    lon: number;
    lat: number;
}

export interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
}

export interface Sys {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
}

export interface WeatherElement {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface Wind {
    speed: number;
    deg: number;
    gust: number;
}

export const emptyWeather: Weather = {
    coord: { lon: 0, lat: 0 },
    weather: [],
    base: "",
    main: {
        temp: 0,
        feels_like: 0,
        temp_min: 0,
        temp_max: 0,
        pressure: 0,
        humidity: 0,
        sea_level: 0,
        grnd_level: 0
    },
    visibility: 0,
    wind: { speed: 0, deg: 0, gust: 0 },
    clouds: { all: 0 },
    dt: 0,
    sys: { type: 0, id: 0, country: "", sunrise: 0, sunset: 0 },
    timezone: 0,
    id: 0,
    name: "",
    cod: 0
};