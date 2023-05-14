import {createSlice} from '@reduxjs/toolkit';

export const fridgeItemsSlice = createSlice({
  name: 'fridgeItems',
  initialState: {
    fridgeItems: [],
    fridgeId: null,
    fridgeCode: null,
  },
  reducers: {
    addFridgeItem: (state, action) => {
      state.fridgeItems.push(action.payload);
    },
    setFridgeId: (state, action) => {
      state.fridgeId = action.payload;
    },
    setFridgeCode: (state, action) => {
      state.fridgeCode = action.payload;
    },
    setFridgeItems: (state, action) => {
      state.fridgeItems = action.payload;
    },
  },
});

export const {addFridgeItem, setFridgeCode, setFridgeId, setFridgeItems} =
  fridgeItemsSlice.actions;

export default fridgeItemsSlice.reducer;
