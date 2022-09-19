import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Author(): React.ReactElement {
  return (
    <View style={styles.page}>
      <View style={styles.cell}>
        <View style={styles.cellItem}>
          <Text style={styles.itemText}>作者</Text>
          <Text style={styles.itemRightText}>撇捺</Text>
        </View>
        <View style={styles.cellItem}>
          <Text style={styles.itemText}>城市</Text>
          <Text style={styles.itemRightText}>厦门</Text>
        </View>
        <View style={styles.cellItem}>
          <Text style={styles.itemText}>工作</Text>
          <Text style={styles.itemRightText}>前端开发</Text>
        </View>
        <View style={styles.cellItem}>
          <Text style={styles.itemText}>github主页</Text>
          <Text style={[styles.itemRightText, styles.itemHref]}>
            https://github.com/xlz122
          </Text>
        </View>
        <View style={styles.cellItem}>
          <Text style={styles.itemText}>个人博客</Text>
          <Text style={[styles.itemRightText, styles.itemHref]}>
            https://www.xlz122.cn
          </Text>
        </View>
        <View style={[styles.cellItem, styles.cellLastItem]}>
          <Text style={styles.itemText}>开源项目 - 网易云</Text>
          <Text style={[styles.itemRightText, styles.itemHref]}>
            https://n.xlz122.cn
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
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
    paddingTop: 13,
    paddingBottom: 13,
    marginRight: 17,
    marginLeft: 17,
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
    fontFamily: 'iconfont',
    fontStyle: 'normal',
    fontSize: 12,
    color: 'rgb(153, 153, 153)'
  },
  itemHref: {
    color: '#e54847'
  },
  cellLastItem: {
    borderBottomWidth: 0
  }
});

export default Author;
