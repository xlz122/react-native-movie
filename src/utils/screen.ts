import { Dimensions, StatusBar } from 'react-native';

// 获取屏幕高度
const deviceHeight = Dimensions.get('window').height;
// 获取状态栏高度
const StatusBarHeight = StatusBar.currentHeight || 0;

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
