import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import type { Navigation } from '../../types/index';
import styles from './mine.css';

type Props = {
  navigation: Navigation;
};

function Mine(props: Props): React.ReactElement {
  return (
    <View style={styles.page}>
      <View style={styles.userInfo}>
        <Image
          source={require('../../assets/image/default-avatar.jpg')}
          resizeMode={'stretch'}
          style={[styles.avatar]}
        />
        <Text
          onPress={() => props?.navigation.push('Login')}
          style={styles.userText}
        >
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
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => props?.navigation?.push('Project')}
          style={styles.cellItem}
        >
          <Text style={styles.cellItemIcon}>{'\ue655'}</Text>
          <Text style={styles.cellItemText}>关于项目</Text>
          <Text style={styles.cellItemArrow}>{'\ue906'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => props?.navigation?.push('Author')}
          style={styles.cellItem}
        >
          <Text style={styles.cellItemIcon}>{'\ue634'}</Text>
          <Text style={styles.cellItemText}>关于作者</Text>
          <Text style={styles.cellItemArrow}>{'\ue906'}</Text>
        </TouchableOpacity>
        <View style={[styles.cellItem, styles.cellLastItem]}>
          <Text style={styles.cellItemIcon}>{'\ue60b'}</Text>
          <Text style={styles.cellItemText}>更新日志</Text>
          <Text style={styles.cellItemArrow}>{'\ue906'}</Text>
        </View>
      </View>
    </View>
  );
}

export default Mine;
