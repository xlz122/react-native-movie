import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import storage from '../utils/storage';

async function faultTolerant<T>(name: string) {
  return await storage.getObjectItem<T>(name);
}

export type RoutineState = {
  isLogin: Promise<boolean | null> | boolean;
  token: Promise<string | null> | string;
  userinfo: unknown;
};

const initialState: RoutineState = {
  isLogin: faultTolerant<boolean>('isLogin') || false,
  token: faultTolerant<string>('token') || '',
  userinfo: faultTolerant('userinfo') || {}
};

const routineSlice = createSlice({
  name: 'routine',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      storage.setStringItem('token', action.payload);
      storage.setObjectItem('isLogin', JSON.stringify(true));
    },
    setUserInfo: (state, action: PayloadAction<unknown>) => {
      state.userinfo = action.payload;
      storage.setObjectItem('userinfo', JSON.stringify(action.payload));
    },
    setLogout: state => {
      state.token = '';
      storage.setStringItem('token', '');
      storage.setObjectItem('isLogin', JSON.stringify(false));
      state.userinfo = {};
      storage.setObjectItem('userinfo', JSON.stringify({}));
    }
  }
});

export const { setToken, setUserInfo, setLogout } = routineSlice.actions;

export default routineSlice.reducer;
