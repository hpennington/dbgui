import { createSlice } from '@reduxjs/toolkit';

export const navTreeSlice = createSlice({
  name: 'navTree',
  initialState: {
    databases: [],
  },
  reducers: {
    setDatabases: (names) => {
      return names.map(name => ({name: name, tables: []}))
    },
  },
});

export const { setDatabases } = navTreeSlice.actions;
export default navTreeSlice.reducer;
