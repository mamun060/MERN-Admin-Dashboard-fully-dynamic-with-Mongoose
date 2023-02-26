import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import globalStateReducer from '../features/state/globalStateSlice';
import { apiSlice } from 'features/api/api';

export const store = configureStore({
  reducer: {
    globalstate: globalStateReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(apiSlice.middleware)
});
