import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/router/StackNavigator';
import { Provider } from 'react-redux';
import store from './src/store/index';
// 忽略react-native-gesture-handler警告
// import { LogBox } from 'react-native';

// LogBox.ignoreLogs([
//   "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
// ]);

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
