import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/index';

type UserInfo = {
  username?: string;
  avatar?: string;
  phone?: string;
  gender?: string;
  birthday?: string | null;
};

function User(): React.ReactElement {
  const userinfo = useSelector(
    (state: RootState) => state.routine.userinfo
  ) as UserInfo;

  return (
    <View style={styles.page}>
      <View style={styles.cell}>
        <View style={styles.cellItem}>
          <Text style={styles.itemText}>头像</Text>
          <Image
            source={{ uri: userinfo?.avatar }}
            resizeMode={'stretch'}
            style={[styles.itemRightImage]}
          />
        </View>
        <View style={styles.cellItem}>
          <Text style={styles.itemText}>用户名</Text>
          <Text style={styles.itemRightText}>{userinfo?.username}</Text>
        </View>
        <View style={styles.cellItem}>
          <Text style={styles.itemText}>手机号</Text>
          <Text style={styles.itemRightText}>{userinfo?.phone}</Text>
        </View>
        <View style={styles.cellItem}>
          <Text style={styles.itemText}>性别</Text>
          <Text style={styles.itemRightText}>{userinfo?.gender}</Text>
        </View>
        <View style={[styles.cellItem, styles.cellLastItem]}>
          <Text style={styles.itemText}>生日</Text>
          <Text style={styles.itemRightText}>{userinfo?.birthday}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  cell: {
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 6
  },
  cellItem: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    lineHeight: 44,
    marginHorizontal: 17,
    borderBottomWidth: 0.4,
    borderStyle: 'solid',
    borderColor: '#eee'
  },
  itemText: {
    flex: 1,
    fontSize: 12,
    color: '#303133'
  },
  itemRightText: {
    marginLeft: 13,
    fontSize: 12,
    color: 'rgb(153, 153, 153)'
  },
  itemRightImage: {
    width: 31,
    height: 31,
    marginLeft: 13,
    borderRadius: 22
  },
  cellLastItem: {
    borderBottomWidth: 0
  }
});

export default User;
