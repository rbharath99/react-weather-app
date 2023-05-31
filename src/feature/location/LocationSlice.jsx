import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getCurrentLocation = createAsyncThunk(
  'location/getCurrentLocation',
  async (_, { rejectWithValue }) => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })

      const { longitude, latitude } = position.coords
      return { longitude, latitude }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const locationSlice = createSlice({
  name: 'location',
  initialState: {
    longitude: null,
    latitude: null,
    error: null,
    loading: false
  },
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
        state.longitude = 0
        state.latitude = 0
        state.error = action.payload
      })
  }
})

export default locationSlice.reducer
