import { configureStore } from '@reduxjs/toolkit';
import navTreeReducer from '../features/navtree/navTreeSlice';
import spreadsheetReducer from '../features/spreadsheet/spreadsheetSlice';

export default configureStore({
  reducer: {
    navTree: navTreeReducer,
    spreadsheet: spreadsheetReducer,
  },
});
