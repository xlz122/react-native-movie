import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import storage from '@/utils/storage';
import type { Navigation, TextInputEvent } from '@/types/index';
import SearchDetail from './search-detail/SearchDetail';
import SearchHistory from './search-history/SearchHistory';

function Search(): React.ReactElement {
  const navigation: Navigation = useNavigation();

  const cancel = () => {
    navigation.goBack();
  };

  const [search, setSearch] = useState({
    keyword: '',
    type: 'movie'
  });

  const handleInputChange = (e: TextInputEvent): void => {
    setSearch({ ...search, keyword: e.nativeEvent.text });
  };

  const handleClearKeyword = () => {
    setSearch({ ...search, keyword: '' });
  };

  // 记录历史记录
  const handleInputBlur = async (): Promise<void | boolean> => {
    if (!search.keyword) {
      return false;
    }

    const history = await storage.getObjectItem('history');

    const searchHistory: string[] = [];
    if (!history) {
      searchHistory.push(search.keyword);
      await storage.setObjectItem('history', searchHistory);
    }

    if (history && history instanceof Array) {
      history[history.length] = search.keyword;

      // 搜索记录去重
      await storage.setObjectItem('history', Array.from(new Set(history)));
    }
  };

  // 历史记录搜索
  const historySearch = (value: string) => {
    setSearch({ ...search, keyword: value });
  };

  const [tab] = useState([
    { title: '影视', type: 'movie' },
    { title: '影人', type: 'actor' },
    { title: '角色', type: 'role' }
  ]);

  const toggleSort = (value: string): void => {
    setSearch({ ...search, type: value });
  };

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <View style={styles.input}>
          <Text style={styles.inputIcon}>{'\ue613'}</Text>
          <TextInput
            value={search.keyword}
            autoFocus={true}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            placeholder="找影视 / 影人 / 角色"
            style={styles.inputText}
          />
          {Boolean(search?.keyword) && (
            <TouchableOpacity activeOpacity={1} onPress={handleClearKeyword}>
              <Text style={styles.inputClearIcon}>{'\ue637'}</Text>
            </TouchableOpacity>
          )}
        </View>
        <Text onPress={cancel} style={styles.cancelText}>
          取消
        </Text>
      </View>
      {Boolean(search?.keyword) && (
        <>
          <View style={styles.tab}>
            {tab.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={1}
                  onPress={() => toggleSort(item.type)}
                  style={styles.tabItem}
                >
                  <Text style={styles.tabItemText}>{item.title}</Text>
                  <View
                    style={
                      search.type === item.type ? styles.tabActiveLine : null
                    }
                  />
                </TouchableOpacity>
              );
            })}
          </View>
          <SearchDetail search={search} />
        </>
      )}
      {!search.keyword && <SearchHistory historySearch={historySearch} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  search: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingLeft: 10,
    height: 40
  },
  input: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 30,
    backgroundColor: '#f5f5f5',
    borderRadius: 70
  },
  inputIcon: {
    paddingHorizontal: 10,
    fontFamily: 'iconfont',
    fontSize: 14
  },
  inputText: {
    flex: 1,
    padding: 0,
    fontSize: 13,
    color: '#666'
  },
  inputClearIcon: {
    marginRight: 12,
    fontFamily: 'iconfont',
    fontSize: 16,
    color: '#c5c5c5'
  },
  cancelText: {
    paddingRight: 10,
    width: 78,
    height: '100%',
    lineHeight: 30,
    fontSize: 12.5,
    color: '#777',
    textAlign: 'center'
  },
  tab: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 8,
    height: 45,
    borderBottomWidth: 0.5,
    borderStyle: 'solid',
    borderColor: '#eee',
    overflow: 'hidden'
  },
  tabItem: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 57,
    height: '100%'
  },
  tabItemText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#666',
    textAlign: 'center'
  },
  tabActiveLine: {
    position: 'absolute',
    left: '50%',
    bottom: 2.6,
    marginLeft: -11,
    width: 22,
    height: 3,
    backgroundColor: 'rgb(229, 72, 71)',
    borderRadius: 6
  }
});

export default Search;
