const router = [
  {
    name: 'Home', // 跳转路径
    title: '', // 标题
    headerShown: false,
    component: require('./TabNavigator').default
  },
  // 非tabbar页面路径
  {
    name: 'Login',
    title: '登录',
    headerShown: false,
    component: require('../views/login/Login').default
  }
];

export default router;
