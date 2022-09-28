import { configureStore } from '@reduxjs/toolkit';
import routineSlice from './routineSlice';
// redux-persist持久化存储
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage
  // 黑名单
  // blacklist: [],
  // 白名单
  // whitelist: []
};

const persistedReducer = persistReducer(persistConfig, routineSlice);

const store = configureStore({
  reducer: {
    routine: persistedReducer
  },
  middleware: getDefaultMiddleware =>
    // 忽略redux-persist调度的所有动作类型
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
