import { configureStore } from '@reduxjs/toolkit';
import bmiReducer from './bmiSlice';

export const store = configureStore({
  reducer: {
    bmi: bmiReducer,
  },
});
