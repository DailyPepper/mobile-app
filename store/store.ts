import { configureStore } from '@reduxjs/toolkit';
import basfiReducer from './basfiSlice';

const store = configureStore({
  reducer: {
    basfi: basfiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
