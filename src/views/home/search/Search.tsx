import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Search(): React.ReactElement {
  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <Text style={styles.inputIcon}>{'\ue613'}</Text>
        <Text style={styles.inputText}>请输入你要搜索的内容</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: 50,
    paddingLeft: 10,
    paddingRight: 10
  },
  input: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    background: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 18
  },
  inputIcon: {
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: 'iconfont',
    fontSize: 14
  },
  inputText: {
    flex: 1,
    color: '#666'
  }
});

export default Search;
