import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/index';
import type { Navigation } from '@/types/index';
import styles from './mine.css';

type Props = {
  navigation: Navigation;
};

type UserInfo = {
  username?: string;
  avatar?: string;
};

function Mine(props: Props): React.ReactElement {
  const userinfo = useSelector(
    (state: RootState) => state.routine.userinfo
  ) as UserInfo;
  const isLogin = useSelector((state: RootState) => state.routine.isLogin);
  console.log(isLogin);

  return (
    <View style={styles.page}>
      <View style={styles.userInfo}>
        {Boolean(userinfo?.username) && (
          <>
            <Image
              source={{ uri: userinfo?.avatar }}
              resizeMode={'stretch'}
              style={[styles.avatar]}
            />
            <Text style={styles.userNameText}>{userinfo?.username}</Text>
          </>
        )}
        {!userinfo?.username && (
          <>
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
          </>
        )}
        {Boolean(isLogin) && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => props?.navigation.push('Setting')}
            style={styles.setting}
          >
            <Text style={styles.settingIcon}>{'\ue65e'}</Text>
          </TouchableOpacity>
        )}
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
          <Text style={styles.cellItemIcon}>{'\ue701'}</Text>
          <Text style={styles.cellItemText}>兴趣爱好</Text>
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
          style={[styles.cellItem, styles.cellLastItem]}
        >
          <Text style={styles.cellItemIcon}>{'\ue634'}</Text>
          <Text style={styles.cellItemText}>关于作者</Text>
          <Text style={styles.cellItemArrow}>{'\ue906'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Mine;
