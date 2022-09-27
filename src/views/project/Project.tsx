import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Project(): React.ReactElement {
  return (
    <View style={styles.page}>
      <View style={styles.cell}>
        <View style={styles.cellItem}>
          <Text style={styles.itemText}>react native</Text>
          <Text style={styles.itemRightText}>0.70.1</Text>
        </View>
        <View style={[styles.cellItem, styles.cellLastItem]}>
          <Text style={styles.itemText}>维护时间</Text>
          <Text style={styles.itemRightText}>长期维护</Text>
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
    fontSize: 12,
    color: 'rgb(153, 153, 153)'
  },
  cellLastItem: {
    borderBottomWidth: 0
  }
});

export default Project;
