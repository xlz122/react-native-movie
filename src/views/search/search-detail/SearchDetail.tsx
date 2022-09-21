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
import { viewHeight } from '../../../utils/screen';
import { searchDetail } from '../../../api/search';
import type { Navigation, ResponseType } from '../../../types/index';
import ScrollRefresh from '../../../components/scroll-refresh/ScrollRefresh';

type Props = {
  search: {
    keyword: string;
    type: string;
  };
};

type Movie = {
  id: number;
  title: string;
  poster: string;
  year: string;
  genres: string;
  countries: string;
};

function SearchDetail(props: Props): React.ReactElement {
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

  const getSearchDetail = () => {
    searchDetail({
      ...props.search,
      page: state.page,
      per_page: state.per_page
    })
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
    setMovie([]);
    setState(state => {
      state.page = 1;
      state.complete = false;
      getSearchDetail();

      return state;
    });
  }, [props.search.type]);

  useEffect(() => {
    getSearchDetail();
  }, [state.page]);

  // 电影项
  const MovieItem = ({ item }) => (
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
        <Text style={styles.itemRating}>
          <Text style={styles.itemRatingWeight}>{item?.rating}</Text>分
        </Text>
      </View>
    </TouchableOpacity>
  );

  // 演员项
  const ActorItem = ({ item }) => (
    <TouchableOpacity activeOpacity={1}>
      <View style={styles.item}>
        <Image
          source={{ uri: item.avatar }}
          resizeMode={'stretch'}
          style={[styles.itemImage]}
        />
        <View style={styles.itemInfo}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemTitle}>
            {item.name}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemText}>
            {item.name_en}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemText}>
            {item.gender}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // 角色项
  const RoleItem = () => (
    <TouchableOpacity activeOpacity={1}>
      <View style={styles.item}>
        <Text>角色项未完成</Text>
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
      getSearchDetail();
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
        renderItem={({ item }) => {
          if (props.search.type === 'movie') {
            return <MovieItem item={item} />;
          }
          if (props.search.type === 'actor') {
            return <ActorItem item={item} />;
          }
          if (props.search.type === 'role') {
            return <RoleItem />;
          }

          return <View />;
        }}
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
    width: '100%',
    height: Platform.OS === 'web' ? viewHeight - 85 : viewHeight + 42 - 85,
    backgroundColor: '#fff'
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 16,
    marginRight: -20,
    marginLeft: 16
  },
  itemImage: {
    width: 70,
    height: 92,
    borderRadius: 3
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
    fontSize: 13,
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

export default SearchDetail;
