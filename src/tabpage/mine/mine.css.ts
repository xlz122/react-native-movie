import { StyleSheet } from 'react-native';
import { getScreenViewHeight } from '../../utils/screen';

// 获取屏幕内容高度
const viewHeight = getScreenViewHeight();

const styles = StyleSheet.create({
  page: {
    minHeight: viewHeight,
    backgroundColor: '#f5f5f5'
  },
  userInfo: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 17,
    paddingRight: 17,
    height: 209,
    backgroundColor: '#e54847'
  },
  avatar: {
    width: 73,
    height: 73,
    borderRadius: 100
  },
  userText: {
    marginLeft: 11,
    color: '#fff'
  },
  settingIcon: {
    position: 'absolute',
    top: 16,
    right: 25,
    fontFamily: 'iconfont',
    fontSize: 18,
    color: '#fff'
  },
  menu: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -45,
    marginRight: 17,
    marginLeft: 17,
    height: 90,
    backgroundColor: '#fff',
    borderRadius: 6
  },
  menuItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  menuItemCount: {
    width: 9,
    height: 36,
    lineHeight: 36,
    fontSize: 18,
    color: '#e54847',
    borderRadius: 100
  },
  menuItemName: {
    marginTop: 9,
    fontSize: 11,
    fontFamily: 'inherit',
    fontWeight: 'bold',
    color: '#666'
  },
  cell: {
    margin: 18,
    backgroundColor: '#fff',
    borderRadius: 6
  },
  cellItem: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 13,
    paddingBottom: 13,
    marginRight: 17,
    marginLeft: 17
  },
  cellItemIcon: {
    marginRight: 6,
    fontFamily: 'iconfont',
    fontSize: 16,
    color: 'rgb(255, 190, 16)'
  },
  cellItemText: {
    flex: 1,
    fontSize: 12,
    color: '#303133'
  },
  cellItemArrow: {
    marginLeft: 13,
    fontFamily: 'iconfont',
    fontStyle: 'normal',
    fontSize: 12,
    color: 'rgb(153, 153, 153)'
  },
  cellItemLine: {
    position: 'absolute',
    left: '5%',
    bottom: 0,
    width: '90%',
    height: 0.38,
    backgroundColor: '#eee'
  }
});

export default styles;
