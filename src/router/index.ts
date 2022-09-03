import type { FunctionComponent } from 'react';
import type { ViewStyle } from 'react-native';

export type Router = {
  name: string;
  title: string;
  headerShown: boolean;
  headerStyle?: ViewStyle;
  headerTitleStyle?: ViewStyle;
  component: FunctionComponent;
};

const router: Router[] = [
  // tabbar页面
  {
    name: 'Home', // 跳转路径
    title: '', // 标题
    headerShown: false,
    component: require('./TabNavigator').default
  },
  // 非tabbar页面
  {
    name: 'Login',
    title: '',
    headerShown: false,
    component: require('../views/login/Login').default
  },
  {
    name: 'Search',
    title: '',
    headerShown: false,
    component: require('../views/search/Search').default
  },
  {
    name: 'Theater',
    title: '正在热映',
    headerShown: true,
    component: require('../views/theater/Theater').default
  },
  {
    name: 'HighScore',
    title: 'TOP 100',
    headerShown: true,
    component: require('../views/high-score/HighScore').default
  }
];

export default router;
