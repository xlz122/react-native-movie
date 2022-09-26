import { configureStore } from '@reduxjs/toolkit';
import routineSlice from './routineSlice';

const store = configureStore({
  reducer: {
    routine: routineSlice
  },
  middleware: getDefaultMiddleware =>
    // JSON.parse序列化
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
