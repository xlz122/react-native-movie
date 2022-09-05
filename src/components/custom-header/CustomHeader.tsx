import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import type { StackNavigationOptions } from '@react-navigation/stack';
import type { Navigation } from '../../types/index';

type Props = {
  navigation: Navigation;
  options?: StackNavigationOptions;
  children?: React.ReactNode;
};

function CustomHeader(props: Props): React.ReactElement {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => props?.navigation.goBack()}
        style={styles.arrow}
      >
        <Text style={styles.arrowIcon}>{'\ue656'}</Text>
      </TouchableOpacity>
      <Text style={styles.text}>{props?.options?.title}</Text>
      {props?.children}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 42,
    backgroundColor: '#e54847'
  },
  arrow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 46,
    height: 42
  },
  arrowIcon: {
    fontFamily: 'iconfont',
    fontSize: 16,
    color: '#fff'
  },
  text: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#fff'
  }
});

export default CustomHeader;
