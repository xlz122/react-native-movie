import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import type { ParamListBase, RouteProp } from '@react-navigation/native';
import router from './index';

const Stack = createStackNavigator();

type Route = RouteProp<ParamListBase, string>;

// 从子导航器获取路由名称
const getChildTitle = (route: Route) => {
  const routeName = getFocusedRouteNameFromRoute(route);

  return routeName;
};

function StackNavigator(): React.ReactElement {
  return (
    <Stack.Navigator>
      {router.map((item, index) => {
        return (
          <Stack.Screen
            key={index}
            name={item.name}
            component={item.component}
            options={({ route }: { route: Route }) => ({
              title: getChildTitle(route) || item.title,
              headerShown: item.headerShown, // 头部标题栏
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
