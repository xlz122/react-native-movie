import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { viewHeight } from '../../utils/screen';
import { movieToday } from '../../api/home';
import type { Navigation, ResponseType } from '../../types/index';
import type { PagingParams } from '../../api/home';

type Movie = {
  id: number;
  title: string;
  poster: string;
  year: string;
  genres: string;
  countries: string;
};

function Today(): React.ReactElement {
  const navigation: Navigation = useNavigation();

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
      <View style={styles.tab}>
        <Text
          onPress={() => toggleSort('hot')}
          style={[
            styles.tabItem,
            movieParams.sortby === 'hot' ? styles.tabActiveItem : styles.tabItem
          ]}
        >
          热度排序
        </Text>
        <Text
          onPress={() => toggleSort('date')}
          style={[
            styles.tabItem,
            movieParams.sortby === 'date'
              ? styles.tabActiveItem
              : styles.tabItem
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
