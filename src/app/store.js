import { configureStore } from '@reduxjs/toolkit';
import connectorReducer from '../components/connectorSlice';

export const store = configureStore({
  reducer: {
    connector: connectorReducer,
  },
});
