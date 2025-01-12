import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BmiData {
  date: string;
  bmi: number;
  comment: string;
  template: string;
  age: number;
}

interface BmiState {
  bmiHistory: BmiData[];
}

const initialState: BmiState = {
  bmiHistory: [],
};

const bmiSlice = createSlice({
  name: 'bmi',
  initialState,
  reducers: {
    addBmiHistory: (state, action: PayloadAction<BmiData>) => {
      state.bmiHistory.unshift(action.payload);
    },
    setBmiHistory: (state, action: PayloadAction<BmiData[]>) => {
      state.bmiHistory = action.payload;
    },
  },
});

export const { addBmiHistory, setBmiHistory } = bmiSlice.actions;
export default bmiSlice.reducer;
