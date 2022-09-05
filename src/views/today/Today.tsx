import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { getScreenViewHeight } from '../../utils/screen';
import { movieToday } from '../../api/home';
import type { ResponseType } from '../../types/index';
import type { PagingParams } from '../../api/home';

// 获取屏幕内容高度
const viewHeight = getScreenViewHeight();

type Movie = {
  id: number;
  title: string;
  poster: string;
  year: string;
  genres: string;
  countries: string;
};

function Today(): React.ReactElement {
  const [movie, setMovie] = useState<Movie[]>([]);
  const [movieParams, setMovieParams] = useState<PagingParams>({
    page: 1,
    per_page: 11,
    sortby: 'hot'
  });

  const getMovieToday = () => {
    movieToday({ ...movieParams })
      .then((res: ResponseType<Movie[]>) => {
        if (res.code === 200) {
          setMovie(res.data!);
        }
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    getMovieToday();
  }, [movieParams]);

  const toggleSort = (value: string): void => {
    setMovieParams({ ...movieParams, sortby: value });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity activeOpacity={1}>
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
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemText}>
            {item.year}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemText}>
            {item.genres}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemText}>
            {item.countries}
          </Text>
        </View>
        {item?.rating.length && (
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
      <View style={styles.menu}>
        <Text
          onPress={() => toggleSort('hot')}
          style={[
            styles.menuItem,
            movieParams.sortby === 'hot'
              ? styles.menuActiveItem
              : styles.menuItem
          ]}
        >
          热度排序
        </Text>
        <Text
          onPress={() => toggleSort('date')}
          style={[
            styles.menuItem,
            movieParams.sortby === 'date'
              ? styles.menuActiveItem
              : styles.menuItem
          ]}
        >
          时间排序
        </Text>
      </View>
      <FlatList
        initialNumToRender={6}
        showsVerticalScrollIndicator={false}
        data={movie}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingBottom: 18,
    height: viewHeight,
    backgroundColor: '#fff'
  },
  menu: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    borderBottomWidth: 0.5,
    borderStyle: 'solid',
    borderColor: '#eee'
  },
  menuItem: {
    flex: 1,
    height: 44,
    lineHeight: 44,
    fontSize: 12,
    color: '#303133',
    textAlign: 'center'
  },
  menuActiveItem: {
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
    marginLeft: 13
  },
  itemTitle: {
    marginBottom: 1,
    fontSize: 14,
    color: '#333'
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
