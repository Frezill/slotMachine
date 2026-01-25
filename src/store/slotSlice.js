import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Each digit has its own min/max range
  digitRanges: [
    { min: 0, max: 9 }, // Digit 0 (leftmost)
    { min: 0, max: 9 }, // Digit 1
    { min: 0, max: 9 }, // Digit 2
    { min: 0, max: 9 }, // Digit 3 (rightmost)
  ],
  isSpinning: false,
  history: [], // Previous draw results
};

const slotSlice = createSlice({
  name: 'slot',
  initialState,
  reducers: {
    setDigitRange: (state, action) => {
      const { index, min, max } = action.payload;
      if (index >= 0 && index < 4) {
        state.digitRanges[index] = { 
          min: Math.max(0, Math.min(9, min)), 
          max: Math.max(0, Math.min(9, max)) 
        };
      }
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
  setDigitRange, 
  startSpin, 
  setSpinComplete,
  clearHistory,
} = slotSlice.actions;

export default slotSlice.reducer;
