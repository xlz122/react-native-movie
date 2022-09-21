import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { viewHeight } from '../../utils/screen';
import { movieTop } from '../../api/home';
import type { Navigation, ResponseType } from '../../types/index';
import ScrollRefresh from '../../components/scroll-refresh/ScrollRefresh';

type Movie = {
  id: number;
  title: string;
  poster: string;
  year: string;
  genres: string;
  countries: string;
};

function HighScore(): React.ReactElement {
  const navigation: Navigation = useNavigation();

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

  const getMovieTop = () => {
    movieTop({ page: state.page, per_page: state.per_page })
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
    getMovieTop();
  }, [state.page]);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigation.push('MovieDetail', { id: item.id })}
    >
      <View style={styles.item}>
        <View style={styles.itemCover}>
          <Image
            source={{ uri: item.poster }}
            resizeMode={'stretch'}
            style={[styles.itemImage]}
          />
          {index === 0 && (
            <View style={[styles.itemCoverBg, styles.coverBgColor1]} />
          )}
          {index === 1 && (
            <View style={[styles.itemCoverBg, styles.coverBgColor2]} />
          )}
          {index === 2 && (
            <View style={[styles.itemCoverBg, styles.coverBgColor3]} />
          )}
          {index > 2 && (
            <View style={[styles.itemCoverBg, styles.coverBgColor4]} />
          )}
          <Text style={styles.itemCoverText}>{index + 1}</Text>
        </View>
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
        <Text style={styles.itemRating}>
          <Text style={styles.itemRatingWeight}>{item?.rating}</Text>分
        </Text>
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
      getMovieTop();
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
    paddingBottom: Platform.OS !== 'web' ? 10 : 0,
    // web端需要减去标题高度
    height: Platform.OS === 'web' ? viewHeight - 42 : viewHeight,
    backgroundColor: '#fff'
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 18,
    marginRight: -20,
    marginLeft: 16
  },
  itemCover: {
    position: 'relative',
    width: 93,
    height: 124,
    borderRadius: 3,
    overflow: 'hidden'
  },
  itemImage: {
    width: 93,
    height: 124
  },
  itemCoverBg: {
    position: 'absolute',
    top: -18,
    left: -14,
    width: 30,
    height: 48,
    transform: [{ rotate: '-135deg' }]
  },
  coverBgColor1: {
    backgroundColor: 'red'
  },
  coverBgColor2: {
    backgroundColor: '#ff4500'
  },
  coverBgColor3: {
    backgroundColor: '#f4a460'
  },
  coverBgColor4: {
    backgroundColor: '#adadad'
  },
  itemCoverText: {
    position: 'absolute',
    top: 1.6,
    left: 5,
    zIndex: 1,
    fontSize: 10,
    color: '#fff'
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

export default HighScore;
