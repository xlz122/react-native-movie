import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { movieTheater } from '../../api/home';
import type { Navigation, ResponseType } from '../../types/index';
import ScrollRefresh from '../../components/scroll-refresh/ScrollRefresh';

type Props = {
  navigation: Navigation;
};

type Movie = {
  id: number;
  title: string;
  poster: string;
  year: string;
  genres: string;
  countries: string;
};

function Theater(props: Props): React.ReactElement {
  const [state, setState] = useState({
    page: 1,
    per_page: 10,
    // 下拉刷新
    isRefresh: false,
    // 加载更多
    isLoadMore: false,
    loadMoreText: '',
    // 数据是否加载完成
    complete: false
  });

  const [movie, setMovie] = useState<Movie[]>([]);

  const getMovieTheater = () => {
    movieTheater({ page: state.page, per_page: state.per_page })
      .then((res: ResponseType<Movie[]>) => {
        if (res.code === 200) {
          if (state.complete) {
            return false;
          }

          // 下拉刷新、初始化
          if (state.isRefresh || state.page === 1) {
            setMovie(res.data!);
          }

          // 加载更多
          if (state.isLoadMore || state.page !== 1) {
            setMovie(movie.concat(res.data!));
          }

          if (res.data && res.data?.length < state.per_page) {
            setState({
              ...state,
              isRefresh: false,
              isLoadMore: false,
              complete: true,
              loadMoreText: '没有更多数据了'
            });

            return false;
          }

          if (state.page === 1) {
            setState({
              ...state,
              isRefresh: false,
              isLoadMore: false,
              loadMoreText: ''
            });
          } else {
            setState({
              ...state,
              isRefresh: false,
              isLoadMore: false,
              loadMoreText: '加载更多...'
            });
          }
        }
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    getMovieTheater();
  }, [state.page]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => props?.navigation.push('MovieDetail', { id: item.id })}
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
        {item?.rating > 0 && (
          <Text style={styles.itemRating}>
            <Text style={styles.itemRatingWeight}>{item?.rating}</Text> 分
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  const onRefresh = (): void => {
    setMovie([]);
    setState({
      ...state,
      page: 1,
      isRefresh: true,
      complete: false,
      loadMoreText: ''
    });

    // 只有一页直接刷新
    if (state.page === 1) {
      getMovieTheater();
    }
  };

  const onEndReached = (): boolean | undefined => {
    if (state.complete) {
      return false;
    }

    setState({
      ...state,
      page: state.page + 1,
      isLoadMore: true,
      loadMoreText: '加载中...'
    });
  };

  return (
    <View style={styles.page}>
      <ScrollRefresh
        initialNumToRender={6}
        showsVerticalScrollIndicator={false}
        data={movie}
        renderItem={renderItem}
        refreshing={state.isRefresh}
        onRefresh={onRefresh}
        loadMoreText={state.loadMoreText}
        onEndReached={onEndReached}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff'
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

export default Theater;
