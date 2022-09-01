import { Dimensions, StatusBar } from 'react-native';

// 屏幕宽度
const deviceWidth = Dimensions.get('window').width;
// 屏幕高度
const deviceHeight = Dimensions.get('window').height;
// 状态栏高度
const StatusBarHeight = StatusBar.currentHeight || 0;

/**
 * @description 获取屏幕宽度
 */
export function getScreenWidth(): number {
  return deviceWidth;
}

/**
 * @description 获取屏幕高度
 */
export function getScreenHeight(): number {
  return deviceHeight;
}

/**
 * @description 获取屏幕内容高度
 */
export function getScreenViewHeight(): number {
  return deviceHeight - StatusBarHeight;
}
