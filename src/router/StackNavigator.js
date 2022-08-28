import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import router from './index';

const Stack = createStackNavigator();

// 从子导航器获取路由名称
const getChildTitle = route => {
  const routeName = getFocusedRouteNameFromRoute(route);
  return routeName;
};

function StackNavigator() {
  return (
    <Stack.Navigator>
      {router.map((item, index) => {
        return (
          <Stack.Screen
            key={index}
            name={item.name}
            component={item.component}
            options={({ route }) => ({
              title: getChildTitle(route) || item.title,
              headerShown: item.headerShown, // 头部标题
              headerStyle: [
                {
                  backgroundColor: '#fff',
                  height: 40
                },
                item.headerStyle
              ],
              headerTitleStyle: [
                {
                  color: '#000',
                  fontSize: 15
                },
                item.headerTitleStyle
              ]
            })}
          />
        );
      })}
    </Stack.Navigator>
  );
}

export default StackNavigator;
