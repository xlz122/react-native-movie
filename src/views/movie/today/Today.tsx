import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { viewHeight } from '@/utils/screen';
import { movieToday } from '@/api/home';
import type { ListRenderItemInfo } from 'react-native';
import type { Navigation, ResponseType } from '@/types/index';
import ScrollRefresh from '@/components/scroll-refresh/ScrollRefresh';

type ItemType = {
  id: number;
  poster: string;
  title: string;
  category: string;
  year: number;
  genres: string;
  countries: string;
  rating: string;
};

function Today(): React.ReactElement {
  const navigation: Navigation = useNavigation();

  // 刷新列表
  const [resetRefresh, setResetRefresh] = useState(false);

  const [sortby, setSortby] = useState('hot');

  const toggleSort = (value: string): void => {
    setResetRefresh(true);
    setSortby(value);
  };

  const getMovieToday = ({
    page,
    per_page
  }: {
    page: number;
    per_page: number;
  }): Promise<unknown[]> => {
    return new Promise((resolve, reject) => {
      movieToday({ page, per_page, sortby })
        .then((res: ResponseType<unknown[]>) => {
          if (res.code === 200) {
            setResetRefresh(false);
            resolve(res.data!);
          } else {
            reject();
          }
        })
        .catch(() => ({}));
    });
  };

  const renderItem = ({ item }: ListRenderItemInfo<ItemType>) => (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigation.push('MovieDetail', { id: item.id })}
    >
      <View style={styles.item}>
        <Image
          source={{ uri: item.poster }}
          resizeMode={'stretch'}
          style={[styles.itemImage]}
        />
        <View style={styles.itemInfo}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemTitle}>
            {item.title}
          </Text>
          <View style={styles.itemTag}>
            {item?.category && item?.category !== '电影' && (
              <Text style={styles.tag}>{item?.category}</Text>
            )}
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.itemText}
            >
              {item.year}
            </Text>
          </View>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemText}>
            {item.genres}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemText}>
            {item.countries}
          </Text>
        </View>
        {Number(item?.rating) > 0 && (
          <Text style={styles.itemRating}>
            <Text style={styles.itemRatingWeight}>{item?.rating}</Text>
            <Text> 分</Text>
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.tab}>
        <Text
          onPress={() => toggleSort('hot')}
          style={[
            styles.tabItem,
            sortby === 'hot' ? styles.tabActiveItem : styles.tabItem
          ]}
        >
          热度排序
        </Text>
        <Text
          onPress={() => toggleSort('date')}
          style={[
            styles.tabItem,
            sortby === 'date' ? styles.tabActiveItem : styles.tabItem
          ]}
        >
          时间排序
        </Text>
      </View>
      <ScrollRefresh
        page={1}
        pageSize={10}
        request={getMovieToday}
        initialNumToRender={6}
        renderItem={renderItem}
        resetRefresh={resetRefresh}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingBottom: Platform.OS !== 'web' ? 10 : 0,
    // web端需要减去标题高度
    height: Platform.OS === 'web' ? viewHeight - 42 : viewHeight,
    backgroundColor: '#fff'
  },
  tab: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    borderBottomWidth: 0.5,
    borderStyle: 'solid',
    borderColor: '#eee'
  },
  tabItem: {
    flex: 1,
    height: 44,
    lineHeight: 44,
    fontSize: 12,
    color: '#303133',
    textAlign: 'center'
  },
  tabActiveItem: {
    color: '#e54847'
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 18,
    marginRight: -20,
    marginLeft: 16
  },
  itemImage: {
    width: 93,
    height: 124,
    borderRadius: 3
  },
  itemInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingRight: 15,
    marginLeft: 13
  },
  itemTitle: {
    marginBottom: 1,
    fontSize: 14,
    color: '#333'
  },
  itemTag: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  tag: {
    paddingVertical: 0.5,
    paddingHorizontal: 1.8,
    marginTop: 8.5,
    marginRight: 5,
    backgroundColor: 'rgba(254, 179, 0, .15)',
    fontSize: 10,
    color: '#feb300',
    textAlign: 'center',
    borderRadius: 2
  },
  itemText: {
    marginTop: 8,
    fontSize: 11,
    color: '#999'
  },
  itemRating: {
    width: 68,
    fontSize: 8,
    color: '#f16c00'
  },
  itemRatingWeight: {
    fontSize: 12,
    fontWeight: '700'
  }
});

export default Today;
