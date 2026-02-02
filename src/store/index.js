import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import slotReducer from './slotSlice';

// Persist config - don't persist spinning state to avoid UI locks on reload
const slotPersistConfig = {
  key: 'slot',
  storage,
  blacklist: ['isSpinning'],
};

const rootReducer = combineReducers({
  slot: persistReducer(slotPersistConfig, slotReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
