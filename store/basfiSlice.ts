import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BasfiData {
  score: number; 
  date: string;
  basfi: number;
  comment: string;
}

interface BasfiState {
  basfiHistory: BasfiData[];
}

const initialState: BasfiState = {
  basfiHistory: [],
};

const basfiSlice = createSlice({
  name: 'basfi',
  initialState,
  reducers: {
    addBasfiHistory: (state, action: PayloadAction<BasfiData>) => {
      state.basfiHistory.unshift(action.payload);
    },
    setBasfiHistory: (state, action: PayloadAction<BasfiData[]>) => {
      state.basfiHistory = action.payload;
    },
  },
});

export const { addBasfiHistory, setBasfiHistory } = basfiSlice.actions;
export default basfiSlice.reducer;
