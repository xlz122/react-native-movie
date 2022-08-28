import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const tabbar = [
  {
    name: 'Find',
    label: '发现',
    headerShown: false,
    icon: require('../assets/image/tab/tab-find.png'),
    selectIcon: require('../assets/image/tab/tab-finded.png'),
    component: require('../views/bolg/Bolg.js').default
  },
  {
    name: 'Bolg',
    label: '播客',
    headerShown: false,
    icon: require('../assets/image/tab/tab-bolg.png'),
    selectIcon: require('../assets/image/tab/tab-bolged.png'),
    component: require('../views/bolg/Bolg.js').default
  },
  {
    name: 'Mine',
    label: '我的',
    headerShown: false,
    icon: require('../assets/image/tab/tab-mine.png'),
    selectIcon: require('../assets/image/tab/tab-mineed.png'),
    component: require('../views/bolg/Bolg.js').default
  },
  {
    name: 'Follow',
    label: '关注',
    headerShown: false,
    icon: require('../assets/image/tab/tab-follow.png'),
    selectIcon: require('../assets/image/tab/tab-followed.png'),
    component: require('../views/bolg/Bolg.js').default
  }
];

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarInactiveTintColor: '#b3b3b3',
        tabBarActiveTintColor: 'red',
        tabBarStyle: {
          fontSize: 26
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
            headerShown={item.headerShown}
            component={item.component}
            options={{
              tabBarLabel: item.label,
              headerShown: item.headerShown,
              tabBarIcon: ({ focused }) => {
                return (
                  <Image
                    source={focused ? item.selectIcon : item.icon}
                    style={[styles.image]}
                  />
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
  image: {
    width: 27,
    height: 27
  }
});

export default TabNavigator;
