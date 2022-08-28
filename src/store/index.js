import { configureStore } from '@reduxjs/toolkit';
import routineSlice from './routineSlice';

const store = configureStore({
  reducer: {
    routine: routineSlice
  }
});

export default store;
