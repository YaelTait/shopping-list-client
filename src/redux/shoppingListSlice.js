import { createSlice } from '@reduxjs/toolkit';

const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    clearList: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, clearList } = shoppingListSlice.actions;
export const selectShoppingList = (state) => state.shoppingList.items;

export default shoppingListSlice.reducer;
