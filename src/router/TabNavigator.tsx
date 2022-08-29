import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const tabbar = [
  {
    name: 'Find',
    label: '首页',
    headerShown: false,
    icon: '\ue908',
    selectIcon: '\ue908',
    component: require('../views/home/Home').default
  },
  {
    name: 'Movies',
    label: '分类',
    headerShown: false,
    icon: '\ue636',
    selectIcon: '\ue636',
    component: require('../views/movies/Movies').default
  },
  {
    name: 'Videos',
    label: '短片',
    headerShown: false,
    icon: '\ue617',
    selectIcon: '\ue617',
    component: require('../views/videos/Videos').default
  },
  {
    name: 'Mine',
    label: '我的',
    headerShown: false,
    icon: '\ue909',
    selectIcon: '\ue909',
    component: require('../views/mine/Mine').default
  }
];

function TabNavigator(): React.ReactElement {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarInactiveTintColor: '#b7bac3',
        tabBarActiveTintColor: '#e54847',
        tabBarStyle: {
          height: 50
        },
        tabBarLabelStyle: {
          fontSize: 9
        },
        tabBarItemStyle: {
          height: 43
        }
      }}
    >
      {tabbar.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.name}
            component={item.component}
            options={{
              tabBarLabel: item.label,
              headerShown: item.headerShown,
              tabBarIcon: ({ focused }) => {
                return (
                  <Text style={[focused ? styles.selectIcon : styles.icon]}>
                    {focused ? item.selectIcon : item.icon}
                  </Text>
                );
              }
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontFamily: 'iconfont',
    fontSize: 24,
    color: '#b7bac3'
  },
  selectIcon: {
    fontFamily: 'iconfont',
    fontSize: 24,
    color: '#e54847'
  }
});

export default TabNavigator;
