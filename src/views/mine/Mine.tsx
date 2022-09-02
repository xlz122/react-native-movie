import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { getScreenViewHeight } from '../../utils/screen';

// 获取屏幕内容高度
const viewHeight = getScreenViewHeight();

function Mine({ navigation }): React.ReactElement {
  return (
    <View style={styles.mine}>
      <View style={styles.userInfo}>
        <Image
          source={require('../../assets/image/default-avatar.jpg')}
          resizeMode={'stretch'}
          style={[styles.avatar]}
        />
        <Text onPress={() => navigation.push('Login')} style={styles.userText}>
          立即登录
        </Text>
        <Text style={styles.settingIcon}>{'\ue65e'}</Text>
      </View>
      <View style={styles.menu}>
        <View style={styles.menuItem}>
          <Text style={styles.menuItemCount}>-</Text>
          <Text style={styles.menuItemName}>关注影人</Text>
        </View>
        <View style={styles.menuItem}>
          <Text style={styles.menuItemCount}>-</Text>
          <Text style={styles.menuItemName}>关注角色</Text>
        </View>
        <View style={styles.menuItem}>
          <Text style={styles.menuItemCount}>-</Text>
          <Text style={styles.menuItemName}>收藏影评</Text>
        </View>
        <View style={styles.menuItem}>
          <Text style={styles.menuItemCount}>-</Text>
          <Text style={styles.menuItemName}>收藏视频</Text>
        </View>
      </View>
      <View style={styles.cell}>
        <View style={styles.cellItem}>
          <Text style={styles.cellItemIcon}>{'\ue601'}</Text>
          <Text style={styles.cellItemText}>意见反馈</Text>
          <Text style={styles.cellItemArrow}>{'\ue906'}</Text>
          <View style={styles.cellItemLine} />
        </View>
        <View style={styles.cellItem}>
          <Text style={styles.cellItemIcon}>{'\ue634'}</Text>
          <Text style={styles.cellItemText}>关于作者</Text>
          <Text style={styles.cellItemArrow}>{'\ue906'}</Text>
          <View style={styles.cellItemLine} />
        </View>
        <View style={styles.cellItem}>
          <Text style={styles.cellItemIcon}>{'\ue655'}</Text>
          <Text style={styles.cellItemText}>关于项目</Text>
          <Text style={styles.cellItemArrow}>{'\ue906'}</Text>
          <View style={styles.cellItemLine} />
        </View>
        <View style={styles.cellItem}>
          <Text style={styles.cellItemIcon}>{'\ue60b'}</Text>
          <Text style={styles.cellItemText}>更新日志</Text>
          <Text style={styles.cellItemArrow}>{'\ue906'}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mine: {
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

export default Mine;
