import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStore } from 'react-redux';
import type { Navigation } from '@/types/index';

function Setting(): React.ReactElement {
  const navigation: Navigation = useNavigation();
  const store = useStore();

  const logout = () => {
    store.dispatch({
      type: 'routine/setLogout',
      payload: ''
    });

    navigation.goBack();
  };

  return (
    <>
      <View style={styles.page} />
      <TouchableOpacity
        activeOpacity={1}
        onPress={logout}
        style={styles.logout}
      >
        <Text style={styles.logoutText}>退出登录</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff'
  },
  logout: {
    marginBottom: 8
  },
  logoutText: {
    height: 44,
    lineHeight: 44,
    marginHorizontal: 8,
    backgroundColor: '#f56c6c',
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    borderRadius: 4
  }
});

export default Setting;
