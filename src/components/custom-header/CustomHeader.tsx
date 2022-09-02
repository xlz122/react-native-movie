import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type {
  StackNavigationProp,
  StackNavigationOptions
} from '@react-navigation/stack';
import type { ParamListBase } from '@react-navigation/native';

type Props = {
  navigation?: StackNavigationProp<ParamListBase, string, undefined>;
  options?: StackNavigationOptions;
  children?: React.ReactNode;
};

function CustomHeader(props: Props): React.ReactElement {
  return (
    <View style={styles.header}>
      <Text style={styles.icon}>{'\ue656'}</Text>
      <Text onPress={() => props?.navigation?.goBack()} style={styles.text}>
        {props?.options?.title}
      </Text>
      {props?.children}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    height: 38,
    backgroundColor: '#e54847'
  },
  icon: {
    fontFamily: 'iconfont',
    fontSize: 16,
    color: '#fff'
  },
  text: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 13,
    color: '#fff'
  }
});

export default CustomHeader;
