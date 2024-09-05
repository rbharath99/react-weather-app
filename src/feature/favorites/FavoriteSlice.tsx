import { createSlice } from '@reduxjs/toolkit'

interface FavoritesState {
  data: any[];
}

const initialState: FavoritesState = {
  data: []
}

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const { data } = action.payload
      const index = state.data.findIndex((item) => item.name === data.name)

      if (index !== -1) {
        state.data.splice(index, 1)
      } else {
        state.data.push(data)
      }
    }
  }
})

export const { toggleFavorite } = favoriteSlice.actions
export default favoriteSlice.reducer
