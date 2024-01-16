import { createSlice } from '@reduxjs/toolkit';

const totalItemsSlice = createSlice({
  name: 'totalItems',
  initialState: {
    count: 0,
  },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
  },
});

export const { increment } = totalItemsSlice.actions;
export const selectTotalItems = (state) => state.totalItems.count;

export default totalItemsSlice.reducer;
