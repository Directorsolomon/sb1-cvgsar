import { configureStore } from '@reduxjs/toolkit';
import issuesReducer from './issuesSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    issues: issuesReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;