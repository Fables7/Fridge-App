import {configureStore} from '@reduxjs/toolkit';

import fridgeItemsReducer from './fridgeItems';
import joinedFridgesReducer from './joinedFridges';

export const store = configureStore({
  reducer: {
    fridgeItems: fridgeItemsReducer,
    joinedFridges: joinedFridgesReducer,
  },
});
