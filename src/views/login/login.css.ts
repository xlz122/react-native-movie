import { StyleSheet } from 'react-native';
import { getScreenViewHeight } from '../../utils/screen';

// 获取屏幕内容高度
const viewHeight = getScreenViewHeight();

const styles = StyleSheet.create({
  login: {
    minHeight: viewHeight,
    backgroundColor: '#fff'
  },
  close: {
    paddingLeft: 16,
    paddingTop: 16,
    height: 52
  },
  closeIcon: {
    fontFamily: 'iconfont',
    fontSize: 17,
    color: '#e54847'
  },
  title: {
    paddingLeft: 45,
    paddingRight: 45,
    marginTop: 45,
    fontWeight: '700',
    fontSize: 22,
    color: '#303133'
  },
  form: {
    paddingTop: 34,
    paddingLeft: 45,
    paddingRight: 45
  },
  formItem: {
    position: 'relative',
    height: 68
  },
  itemInput: {
    marginTop: 22,
    height: 45
  },
  itemIcon: {
    position: 'absolute',
    top: '50%',
    right: 0,
    fontFamily: 'iconfont',
    fontSize: 18,
    color: '#ccc'
  },
  activeIcon: {
    color: '#e54847'
  },
  itemLine: {
    position: 'absolute',
    left: 0,
    bottom: 2,
    width: '100%',
    height: 0.8,
    backgroundColor: '#eee'
  },
  submit: {
    paddingTop: 34
  },
  tool: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 28,
    paddingLeft: 45,
    paddingRight: 45
  },
  toolText: {
    fontSize: 12,
    color: '#303133'
  }
});

export default styles;
