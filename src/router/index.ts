import { Platform } from 'react-native';
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
    name: 'Forget',
    title: '找回密码',
    headerShown: true,
    component: require('../views/forget/Forget').default
  },
  {
    name: 'Setting',
    title: '设置',
    headerShown: true,
    component: require('../views/setting/Setting').default
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
    name: 'Coming',
    title: '即将上映',
    headerShown: true,
    component: require('../views/coming/Coming').default
  },
  {
    name: 'HighScore',
    title: 'TOP 100',
    headerShown: true,
    component: require('../views/high-score/HighScore').default
  },
  {
    name: 'Awards',
    title: '奖项列表',
    headerShown: true,
    component: require('../views/awards/Awards').default
  },
  {
    name: 'Today',
    title: '那年今日',
    headerShown: true,
    component: require('../views/today/Today').default
  },
  {
    name: 'MovieDetail',
    title: '电影',
    headerShown: true,
    component: require('../views/movie-detail/MovieDetail').default
  },
  {
    name: 'Photos',
    title: '相册',
    headerShown: true,
    component: require('../views/photos/Photos').default
  },
  {
    name: 'ActorDetail',
    title: '',
    headerShown: true,
    component: require('../views/actor-detail/ActorDetail').default
  },
  {
    name: 'ActorList',
    title: '演员表',
    headerShown: true,
    component: require('../views/actor-list/ActorList').default
  },
  {
    name: 'Project',
    title: '关于项目',
    headerShown: true,
    component: require('../views/project/Project').default
  },
  {
    name: 'Author',
    title: '关于作者',
    headerShown: true,
    component: require('../views/author/Author').default
  },
  {
    name: 'WebView',
    title: '',
    headerShown: false,
    component: Platform.select({
      native: require('../views/web-view/WebView.native').default,
      web: ''
    })
  }
];

export default router;
