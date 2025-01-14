import { configureStore } from '@reduxjs/toolkit';
import bmiReducer from './bmiSlice';

const store = configureStore({
  reducer: {
    bmi: bmiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
