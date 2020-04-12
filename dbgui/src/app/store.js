import { configureStore } from '@reduxjs/toolkit';
import navTreeReducer from '../reducers/navTreeSlice';

export default configureStore({
  reducer: {
    navTree: navTreeReducer,
  },
});
