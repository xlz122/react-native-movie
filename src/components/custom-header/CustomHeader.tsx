import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { ViewStyle } from 'react-native';
import type { StackNavigationOptions } from '@react-navigation/stack';
import type { Navigation } from '@/types/index';

type Props = {
  options?: StackNavigationOptions;
  children?: React.ReactNode;
  headerTitleAlign?: boolean;
  headerStyle?: ViewStyle;
  arrowStyle?: ViewStyle;
};

function CustomHeader(props: Props): React.ReactElement {
  const navigation: Navigation = useNavigation();

  return (
    <View style={[styles.header, props?.headerStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigation.goBack()}
        style={[styles.arrow, props?.arrowStyle]}
      >
        <Text style={styles.arrowIcon}>{'\ue656'}</Text>
      </TouchableOpacity>
      <Text
        style={[
          styles.titleText,
          props.headerTitleAlign ? styles.titleCenter : styles.titleText
        ]}
      >
        {props?.options?.title}
      </Text>
      {props?.children}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'relative',
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
  titleText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#fff'
  },
  titleCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -10 }, { translateY: -10 }]
  }
});

export default CustomHeader;
