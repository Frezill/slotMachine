import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Single numeric range for 4-digit numbers (e.g., 0 to 400 means 0000-0400)
  numericRange: {
    min: 0,
    max: 400,
  },
  isSpinning: false,
  history: [], // Previous draw results
};

const slotSlice = createSlice({
  name: 'slot',
  initialState,
  reducers: {
    setNumericRange: (state, action) => {
      const { min, max } = action.payload;
      state.numericRange = { 
        min: Math.max(0, Math.min(9999, min)), 
        max: Math.max(0, Math.min(9999, max)) 
      };
    },
    startSpin: (state) => {
      if (!state.isSpinning) {
        state.isSpinning = true;
      }
    },
    setSpinComplete: (state, action) => {
      const results = action.payload;
      state.isSpinning = false;
      // Add to history
      state.history.unshift({
        id: Date.now(),
        result: results.join(''),
        timestamp: new Date().toLocaleTimeString(),
      });
      // Keep only last 20 results
      if (state.history.length > 20) {
        state.history.pop();
      }
    },
    clearHistory: (state) => {
      state.history = [];
    },
  },
});

export const { 
  setNumericRange, 
  startSpin, 
  setSpinComplete,
  clearHistory,
} = slotSlice.actions;

export default slotSlice.reducer;
