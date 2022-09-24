import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { storageGetItem, storageSetItem } from '../utils/storage';

async function faultTolerant<T>(name: string) {
  return await storageGetItem<T>(name);
}

export type RoutineState = {
  isLogin: Promise<string> | boolean;
  token: Promise<string> | string;
  userinfo: unknown;
};

const initialState: RoutineState = {
  isLogin: faultTolerant<string>('isLogin') || false,
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
      storageSetItem('isLogin', JSON.stringify(true));
    },
    setUserInfo: (state, action: PayloadAction<unknown>) => {
      state.userinfo = action.payload;
      storageSetItem('userinfo', JSON.stringify(action.payload));
    },
    setLogout: state => {
      state.token = '';
      storageSetItem('token', '');
      storageSetItem('isLogin', JSON.stringify(false));
      state.userinfo = {};
      storageSetItem('userinfo', JSON.stringify({}));
    }
  }
});

export const { setToken, setUserInfo, setLogout } = routineSlice.actions;

export default routineSlice.reducer;
