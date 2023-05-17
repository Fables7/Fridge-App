import {createSlice} from '@reduxjs/toolkit';

export const fridgeItemsSlice = createSlice({
  name: 'fridgeItems',
  initialState: {
    fridgeItems: [],
    expiredItems: [],
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
    removeExpiredItem: (state, action) => {
      state.expiredItems = state.expiredItems.filter(
        item => item.id !== action.payload,
      );
    },
    setExpiredItems: (state, action) => {
      state.expiredItems = action.payload;
    },
  },
});

export const {
  addFridgeItem,
  setFridgeCode,
  setFridgeId,
  setFridgeItems,
  removeExpiredItem,
  setExpiredItems,
} = fridgeItemsSlice.actions;

export default fridgeItemsSlice.reducer;
