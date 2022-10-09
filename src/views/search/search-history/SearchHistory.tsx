import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import lodash from 'lodash';
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

  const [clearVisible, setClearVisible] = useState(false);
  const clearVisibleChange = () => {
    setClearVisible(!clearVisible);
  };

  const historyChange = async (item: string, index: number) => {
    // 删除
    if (clearVisible) {
      const h = lodash.cloneDeep(history);
      h.splice(index, 1);
      setHistory(h);
      storage.setObjectItem('history', h);
      return false;
    }

    // 搜索
    props.historySearch(item);
  };

  const clearAllHistory = () => {
    setHistory([]);
    storage.clear();
  };

  return (
    <View style={styles.page}>
      <View style={styles.record}>
        <View style={styles.recordTitle}>
          <Text style={styles.titleText}>历史记录</Text>
          <View style={styles.clear}>
            {clearVisible && (
              <TouchableOpacity
                activeOpacity={1}
                onPress={clearAllHistory}
                style={styles.clearAll}
              >
                <Text style={styles.clearAllText}>全部删除</Text>
                <View style={styles.clearAllLine} />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              activeOpacity={1}
              onPress={clearVisibleChange}
              style={styles.clear}
            >
              <Text style={styles.clearIcon}>{'\ue614'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.recordList}>
          {history?.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={1}
                onPress={() => historyChange(item, index)}
                style={styles.item}
              >
                <Text style={styles.itemText}>{item}</Text>
                {clearVisible && (
                  <Text style={styles.itemIcon}>{'\ue637'}</Text>
                )}
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
  clear: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  clearAll: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  clearAllText: {
    paddingRight: 4.5,
    fontSize: 12,
    color: '#303133'
  },
  clearAllLine: {
    height: 10,
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderColor: '#ccc'
  },
  clearIcon: {
    paddingLeft: 4.5,
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
    position: 'relative'
  },
  itemText: {
    paddingVertical: 2,
    paddingHorizontal: 7,
    marginRight: 12,
    marginBottom: 8,
    backgroundColor: '#f4f4f4',
    fontSize: 13,
    color: '#303133',
    borderRadius: 2
  },
  itemIcon: {
    position: 'absolute',
    top: -4,
    right: -6,
    marginRight: 12,
    fontFamily: 'iconfont',
    fontSize: 13,
    color: '#c5c5c5'
  }
});

export default SearchHistory;
