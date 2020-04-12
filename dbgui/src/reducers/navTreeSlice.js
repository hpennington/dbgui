import { createSlice } from '@reduxjs/toolkit';

export const navTreeSlice = createSlice({
  name: 'navTree',
  initialState: {
    databases: [],
  },
  reducers: {
  },
});

//export const { u } = navTreeSlice.actions;
export default navTreeSlice.reducer;
