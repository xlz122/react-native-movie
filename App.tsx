import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/router/StackNavigator';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './src/store/index';

function App(): React.ReactElement {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
