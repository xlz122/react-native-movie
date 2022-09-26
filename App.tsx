import 'react-native-gesture-handler';
import React from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/router/StackNavigator';
import { Provider } from 'react-redux';
import store from './src/store/index';

// redux初始化循环警告
// 目前使用获取本地存储 -> 调用store.dispatch的方法来初始化
// 没有找到更好的处理方法, 有待优化
LogBox.ignoreLogs(['Require cycle:']);

function App(): React.ReactElement {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
