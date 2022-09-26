import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import storage from '@/utils/storage';
import storeStorage from '@/utils/storeStorage';

export type RoutineState = {
  isLogin: boolean;
  token: string;
  userinfo: unknown;
};

const initialState: RoutineState = {
  isLogin:
    storeStorage.getStringItem({
      key: 'token',
      reducers: 'setToken'
    }) || false,
  token:
    storeStorage.getStringItem({
      key: 'token',
      reducers: 'setToken'
    }) || '',
  userinfo:
    storeStorage.getObjectItem({
      key: 'userinfo',
      reducers: 'setUserInfo'
    }) || {}
};

const routineSlice = createSlice({
  name: 'routine',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isLogin = true;
      storage.setStringItem('token', action.payload);
      storage.setObjectItem('isLogin', true);
    },
    setUserInfo: (state, action: PayloadAction<unknown>) => {
      state.userinfo = action.payload;
      storage.setObjectItem('userinfo', action.payload);
    },
    setLogout: state => {
      state.token = '';
      storage.setStringItem('token', '');
      storage.setObjectItem('isLogin', false);
      state.userinfo = {};
      storage.setObjectItem('userinfo', {});
    }
  }
});

export const { setToken, setUserInfo, setLogout } = routineSlice.actions;

export default routineSlice.reducer;
