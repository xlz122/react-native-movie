import { StatusBar, Dimensions } from 'react-native';

// 状态栏高度
const StatusBarHeight = StatusBar.currentHeight || 0;
// 屏幕宽度
const deviceWidth = Dimensions.get('window').width;
// 屏幕高度
const deviceHeight = Dimensions.get('window').height;
// 获取屏幕内容高度
const viewHeight = deviceHeight - StatusBarHeight;

const screen = {
  StatusBarHeight,
  deviceWidth,
  deviceHeight,
  viewHeight
};

export default screen;
export { StatusBarHeight, deviceWidth, deviceHeight, viewHeight };
