import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface Position {
  longitude: number | null;
  latitude: number | null;
}

interface LocationState {
  longitude: number | null;
  latitude: number | null;
  error: string | null;
  loading: boolean;
}

const initialState: LocationState = {
  longitude: null,
  latitude: null,
  error: null,
  loading: false
}

export const getCurrentLocation = createAsyncThunk<Position, void, { rejectValue: Error }>(
  'location/getCurrentLocation',
  async (_, { rejectWithValue }) => {
    try {
      const geolocationAPI = navigator.geolocation;
      if (!geolocationAPI) {
        return { longitude: null, latitude: null };
      } else {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          geolocationAPI.getCurrentPosition(resolve, reject);
        });
        const { longitude, latitude } = position.coords;
        return { longitude, latitude };
      }
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  }
);

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentLocation.pending, (state) => {
        state.loading = true
      })
      .addCase(getCurrentLocation.fulfilled, (state, action) => {
        state.loading = false
        state.longitude = action.payload.longitude
        state.latitude = action.payload.latitude
        state.error = null
      })
      .addCase(getCurrentLocation.rejected, (state, action) => {
        state.loading = false
        state.longitude = null
        state.latitude = null
        state.error = ''
      })
  }
})

export default locationSlice.reducer
