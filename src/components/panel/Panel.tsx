import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  title?: string;
  subtitle?: string;
  to?: string;
  children?: React.ReactNode;
};

function Panel(props: Props): React.ReactElement {
  return (
    <View style={styles.panel}>
      <View style={styles.header}>
        <View style={styles.title}>
          <View style={styles.titleLine} />
          <Text style={styles.titleText}>{props?.title}</Text>
        </View>
        <View style={styles.more}>
          <Text style={styles.moreText}>{props?.subtitle || '更多'}</Text>
          <Text style={styles.moreIcon}>{'\ue906'}</Text>
        </View>
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
    width: 3,
    height: 14,
    backgroundColor: '#e54847',
    borderRadius: 4
  },
  titleText: {
    marginLeft: 4,
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
