import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState: {
        isFavorite: false,
        locations: [],
    },
    reducers: {
        toggleFavorite: (state, action) => {
            const { location } = action.payload;
            const index = state.locations.indexOf(location);

            if (index !== -1) {
                state.locations.splice(index, 1);
            } else {
                state.locations.push(location);
            }
        },
    }
});

export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;