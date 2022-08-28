import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 获取本地存储对象数据
export async function getStorage(name) {
  const data = await AsyncStorage.getItem(name);
  if (data) {
    return JSON.parse(data);
  } else {
    return {};
  }
}

const initialState = {
  msg: ''
};

const routineSlice = createSlice({
  name: 'routine',
  initialState,
  reducers: {
    setMsg: (state, action) => {
      state.msg = action.msg;
    }
  }
});

export const { setMsg } = routineSlice.actions;

export default routineSlice.reducer;
