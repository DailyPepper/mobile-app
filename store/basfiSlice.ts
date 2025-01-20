import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface HistoryItem {
  date: string;
  score: number;
  comment: string;
}

interface BasfiState {
  basfiHistory: HistoryItem[];
}

const initialState: BasfiState = {
  basfiHistory: [],
};

const basfiSlice = createSlice({
  name: 'basfi',
  initialState,
  reducers: {
    addBasfiHistory(state, action: PayloadAction<HistoryItem[] | HistoryItem>) {
      if (Array.isArray(action.payload)) {
        state.basfiHistory = action.payload;
      } else {
        state.basfiHistory.push(action.payload);
      }
    },
  },
});

export const { addBasfiHistory } = basfiSlice.actions;

export default basfiSlice.reducer;
