import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import storage from '@/utils/storage';
import storeStorage from '@/utils/storeStorage';

export type RoutineState = {
  isLogin: boolean;
  token: string;
  userinfo: unknown;
};

const initialState: RoutineState = {
  isLogin: storeStorage.getObjectItem({
    key: 'isLogin',
    reducers: 'setLogin'
  }),
  token: storeStorage.getStringItem({
    key: 'token',
    reducers: 'setToken'
  }),
  userinfo: storeStorage.getObjectItem({
    key: 'userinfo',
    reducers: 'setUserInfo'
  })
};

const routineSlice = createSlice({
  name: 'routine',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
      storage.setObjectItem('isLogin', action.payload);
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      storage.setStringItem('token', action.payload);
    },
    setUserInfo: (state, action: PayloadAction<unknown>) => {
      state.userinfo = action.payload;
      storage.setObjectItem('userinfo', action.payload);
    },
    setLogout: state => {
      state.token = '';
      storage.setStringItem('token', '');
      state.isLogin = false;
      storage.setObjectItem('isLogin', false);
      state.userinfo = {};
      storage.setObjectItem('userinfo', {});
    }
  }
});

export const { setToken, setUserInfo, setLogout } = routineSlice.actions;

export default routineSlice.reducer;
