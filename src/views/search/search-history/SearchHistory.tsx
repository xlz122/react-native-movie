import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import storage from '@/utils/storage';

type Props = {
  historySearch: (value: string) => void;
};

function SearchHistory(props: Props): React.ReactElement {
  const [history, setHistory] = useState<Array<string>>([]);

  useEffect(() => {
    (async () => {
      const h = (await storage.getObjectItem('history')) || [];
      if (h instanceof Array) {
        setHistory(h);
      }
    })();
  }, []);

  const clearAllHistory = () => {
    setHistory([]);
    storage.clear();
  };

  return (
    <View style={styles.page}>
      <View style={styles.record}>
        <View style={styles.recordTitle}>
          <Text style={styles.titleText}>历史记录</Text>
          <TouchableOpacity activeOpacity={1} onPress={clearAllHistory}>
            <Text style={styles.titleIcon}>{'\ue614'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.recordList}>
          {history?.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={1}
                onPress={() => props.historySearch(item)}
              >
                <Text style={styles.item}>{item}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    marginTop: 15,
    backgroundColor: '#fff'
  },
  record: {
    paddingHorizontal: 15
  },
  recordTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  titleText: {
    fontWeight: '700',
    color: '#303133'
  },
  titleIcon: {
    fontFamily: 'iconfont',
    color: '#303133'
  },
  recordList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10
  },
  item: {
    paddingVertical: 2,
    paddingHorizontal: 7,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#f4f4f4',
    fontSize: 13,
    color: '#303133',
    borderRadius: 2
  }
});

export default SearchHistory;
