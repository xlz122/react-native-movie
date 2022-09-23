import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { storageGetItem, storageSetItem } from '../utils/storage';

async function faultTolerant<T>(name: string) {
  return await storageGetItem<T>(name);
}

export type RoutineState = {
  token: Promise<string> | string;
  userinfo: unknown;
};

const initialState: RoutineState = {
  token: faultTolerant<string>('token') || '',
  userinfo: faultTolerant('userinfo') || {}
};

const routineSlice = createSlice({
  name: 'routine',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      storageSetItem('token', action.payload);
    },
    setUserInfo: (state, action: PayloadAction<unknown>) => {
      state.userinfo = action.payload;
      storageSetItem('userinfo', JSON.stringify(action.payload));
    }
  }
});

export const { setToken } = routineSlice.actions;

export default routineSlice.reducer;
