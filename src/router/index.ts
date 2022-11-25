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
    title: '登录',
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
    title: '搜索',
    headerShown: false,
    component: require('../views/search/Search').default
  },
  {
    name: 'Theater',
    title: '正在热映',
    headerShown: true,
    component: require('../views/movie/theater/Theater').default
  },
  {
    name: 'Coming',
    title: '即将上映',
    headerShown: true,
    component: require('../views/movie/coming/Coming').default
  },
  {
    name: 'HighScore',
    title: 'TOP 100',
    headerShown: true,
    component: require('../views/movie/high-score/HighScore').default
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
    component: require('../views/movie/today/Today').default
  },
  {
    name: 'MovieDetail',
    title: '电影',
    headerShown: true,
    component: require('../views/movie-detail/MovieDetail').default
  },
  {
    name: 'MovieSummary',
    title: '剧情',
    headerShown: false,
    component: require('../views/movie-summary/MovieSummary').default
  },
  {
    name: 'MoviePhotoDetail',
    title: '相册',
    headerShown: true,
    component:
      require('../views/movie-detail/movie-photo-detail/MoviePhotoDetail')
        .default
  },
  {
    name: 'VideoDetail',
    title: '',
    headerShown: true,
    component: require('../views/video-detail/VideoDetail').default
  },
  {
    name: 'RoleDetail',
    title: '',
    headerShown: true,
    component: require('../views/role-detail/RoleDetail').default
  },
  {
    name: 'ActorList',
    title: '演员表',
    headerShown: true,
    component: require('../views/actor-list/ActorList').default
  },
  {
    name: 'ActorDetail',
    title: '',
    headerShown: true,
    component: require('../views/actor-detail/ActorDetail').default
  },
  {
    name: 'ActorPhotoDetail',
    title: '相册',
    headerShown: true,
    component:
      require('../views/actor-detail/actor-photo-detail/ActorPhotoDetail')
        .default
  },
  {
    name: 'UserActor',
    title: '关注影人',
    headerShown: true,
    component: require('../views/user/user-actor/UserActor').default
  },
  {
    name: 'UserRole',
    title: '关注角色',
    headerShown: true,
    component: require('../views/user/user-role/UserRole').default
  },
  {
    name: 'UserVideo',
    title: '收藏视频',
    headerShown: true,
    component: require('../views/user/user-video/UserVideo').default
  },
  {
    name: 'UserProfile',
    title: '个人资料',
    headerShown: true,
    component: require('../views/user/user-profile/UserProfile').default
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
