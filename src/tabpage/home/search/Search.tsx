import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import type { Navigation } from '../../../types/index';

type Props = {
  navigation: Navigation;
};

function Search(props: Props): React.ReactElement {
  return (
    <View style={styles.search}>
      <TouchableOpacity
        onPress={() => props?.navigation.push('Search')}
        activeOpacity={1}
        style={styles.input}
      >
        <Text style={styles.inputIcon}>{'\ue613'}</Text>
        <Text style={styles.inputText}>请输入你要搜索的内容</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    display: 'flex',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 11,
    marginBottom: 11,
    height: 28
  },
  input: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 48
  },
  inputIcon: {
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: 'iconfont',
    fontSize: 14
  },
  inputText: {
    flex: 1,
    fontSize: 13,
    color: '#666'
  }
});

export default Search;
