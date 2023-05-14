import {configureStore} from '@reduxjs/toolkit';

import fridgeItemsReducer from './fridgeItems';

export const store = configureStore({
  reducer: {
    fridgeItems: fridgeItemsReducer,
  },
});
