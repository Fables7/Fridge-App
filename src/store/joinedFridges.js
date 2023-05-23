import {createSlice} from '@reduxjs/toolkit';

export const joinedFridgesSlice = createSlice({
  name: 'joinedFridges',
  initialState: {
    joinedFridges: [],
  },
  reducers: {
    setJoinedFridges: (state, action) => {
      state.joinedFridges = action.payload;
    },
    removeJoinedFridge: (state, action) => {
      state.joinedFridges = state.joinedFridges.filter(
        fridge => fridge.code !== action.payload,
      );
    },
  },
});

export const {setJoinedFridges, removeJoinedFridge} =
  joinedFridgesSlice.actions;

export default joinedFridgesSlice.reducer;
