import { configureStore } from '@reduxjs/toolkit';
import totalItemsReducer from './totalItemsSlice';
import shoppingListReducer from './shoppingListSlice';

const store = configureStore({
  reducer: {
    totalItems: totalItemsReducer,
    shoppingList: shoppingListReducer,
  },
});

export default store;
