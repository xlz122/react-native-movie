import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import type { Navigation } from '../../types/index';

type Props = {
  navigation?: Navigation;
  title?: string;
  subtitle?: string;
  to?: string;
  children?: React.ReactNode;
  panelStyle?: ViewStyle;
  headerStyle?: ViewStyle;
  lineStyle?: ViewStyle;
  titleTextStyle?: TextStyle;
  subTitleStyle?: TextStyle;
  moreIconStyle?: TextStyle;
};

function Panel(props: Props): React.ReactElement {
  return (
    <View style={[styles.panel, props?.panelStyle]}>
      <View style={[styles.header, props?.headerStyle]}>
        <View style={styles.title}>
          <View style={[styles.titleLine, props?.lineStyle]} />
          <Text style={[styles.titleText, props?.titleTextStyle]}>
            {props?.title}
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => props?.navigation?.push(props?.to || '')}
          style={styles.more}
        >
          <Text style={[styles.moreText, props?.subTitleStyle]}>
            {props?.subtitle || ''}
          </Text>
          <Text style={[styles.moreIcon, props?.moreIconStyle]}>
            {'\ue906'}
          </Text>
        </TouchableOpacity>
      </View>
      <View>{props?.children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingBottom: 10,
    margin: 10,
    marginTop: 0,
    backgroundColor: '#fff',
    borderRadius: 6
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    height: 42
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  titleLine: {
    marginRight: 4,
    width: 3,
    height: 14,
    backgroundColor: '#e54847',
    borderRadius: 4
  },
  titleText: {
    fontSize: 13,
    color: '#666'
  },
  more: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 4
  },
  moreText: {
    fontSize: 11,
    color: '#666'
  },
  moreIcon: {
    fontFamily: 'iconfont',
    fontSize: 11,
    color: '#666'
  }
});

export default Panel;
