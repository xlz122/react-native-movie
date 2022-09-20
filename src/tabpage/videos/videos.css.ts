import { StyleSheet, Platform } from 'react-native';
import { getScreenWidth, getScreenViewHeight } from '../../utils/screen';

// 获取屏幕宽度
const deviceWidth = getScreenWidth();
// 获取屏幕内容高度
const viewHeight = getScreenViewHeight();

const styles = StyleSheet.create({
  page: {
    paddingTop: 15,
    paddingBottom: Platform.OS !== 'web' ? 15 : 0,
    // web端需要减去tabBar高度
    height: Platform.OS === 'web' ? viewHeight - 50 : viewHeight,
    backgroundColor: '#fff'
  },
  item: {
    marginLeft: 11,
    marginRight: 11
  },
  itemCover: {
    position: 'relative'
  },
  itemImage: {
    width: deviceWidth - 22,
    height: 196,
    borderRadius: 4
  },
  itemTitle: {
    position: 'absolute',
    top: 7,
    left: 10,
    fontSize: 14,
    color: '#fff'
  },
  itemPlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -22.5,
    marginLeft: -22.5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    borderRadius: 100
  },
  itemPlayIcon: {
    fontFamily: 'iconfont',
    fontSize: 16,
    color: '#fff'
  },
  itemInfoCount: {
    position: 'absolute',
    top: '88%',
    left: 11,
    fontSize: 10,
    color: '#fff'
  },
  itemInfoTime: {
    position: 'absolute',
    top: '88%',
    right: 11,
    fontSize: 10,
    color: '#fff'
  },
  userinfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 11,
    paddingRight: 11,
    height: 49
  },
  author: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row'
  },
  authorAvatar: {
    width: 31,
    height: 31
  },
  authorName: {
    marginLeft: 6,
    fontFamily: 'inherit',
    fontWeight: 'bold',
    fontSize: 11.5,
    color: '#303133'
  },
  tool: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  toolIcon: {
    marginLeft: 11,
    fontFamily: 'iconfont',
    fontSize: 12,
    color: '#303133'
  },
  toolText: {
    marginLeft: 3,
    fontSize: 10,
    color: '#303133'
  }
});

export default styles;
