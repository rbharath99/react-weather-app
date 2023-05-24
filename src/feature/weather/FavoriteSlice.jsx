import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState: {
        isFavorite: false,
    },
    reducers: {
        toggleFavorite: (state) => {
            state.isFavorite = !state.isFavorite
        }
    }
});

export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;