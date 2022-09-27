import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  page: {
    flex: 1,
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
    width: 66,
    height: 66,
    borderRadius: 100
  },
  userText: {
    marginLeft: 11,
    color: '#fff'
  },
  userNameText: {
    marginLeft: 11,
    fontWeight: '700',
    fontSize: 16,
    color: '#fff'
  },
  setting: {
    position: 'absolute',
    top: 6,
    right: 14,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40
  },
  settingIcon: {
    fontFamily: 'iconfont',
    fontSize: 18,
    color: '#fff'
  },
  cell: {
    margin: 14,
    marginBottom: 0,
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
    marginLeft: 17,
    borderBottomWidth: 0.4,
    borderStyle: 'solid',
    borderColor: '#eee'
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
  cellLastItem: {
    borderBottomWidth: 0
  }
});

export default styles;
