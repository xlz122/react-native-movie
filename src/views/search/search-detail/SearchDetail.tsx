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
import { viewHeight } from '@/utils/screen';
import { searchDetail } from '@/api/search';
import type { ListRenderItemInfo } from 'react-native';
import type { Navigation, ResponseType } from '@/types/index';
import ScrollRefresh from '@/components/scroll-refresh/ScrollRefresh';

type Props = {
  search: {
    keyword: string;
    type: string;
  };
};

type MovieItemType = {
  id: number;
  poster: string;
  title: string;
  year: number;
  genres: string;
  countries: string;
  rating: string;
};
type ActorItemType = {
  id: number;
  avatar: string;
  name: string;
  name_en: string;
  gender: string;
};
type RoleItemType = {
  id: number;
  avatar: string;
  name: string;
  name_en: string;
};

function SearchDetail(props: Props): React.ReactElement {
  const navigation: Navigation = useNavigation();

  const getSearchDetail = ({
    page,
    per_page
  }: {
    page: number;
    per_page: number;
  }): Promise<unknown[]> => {
    return new Promise((resolve, reject) => {
      searchDetail({
        page,
        per_page,
        keyword: props.search.keyword,
        type: props.search.type
      })
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

  // 刷新列表
  const [resetRefresh, setResetRefresh] = useState(false);
  useEffect(() => {
    setResetRefresh(true);
  }, [props.search]);

  // 电影项
  const MovieItem = ({ item }: { item: MovieItemType }) => (
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

  // 影人项
  const ActorItem = ({ item }: { item: ActorItemType }) => (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigation.push('ActorDetail', { id: item.id })}
    >
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
  const RoleItem = ({ item }: { item: RoleItemType }) => (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigation.push('RoleDetail', { id: item.id })}
    >
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
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.page}>
      <ScrollRefresh
        page={1}
        pageSize={10}
        request={getSearchDetail}
        initialNumToRender={6}
        renderItem={({ item }: ListRenderItemInfo<unknown>) => {
          if (props.search.type === 'movie') {
            return <MovieItem item={item as MovieItemType} />;
          }
          if (props.search.type === 'actor') {
            return <ActorItem item={item as ActorItemType} />;
          }
          if (props.search.type === 'role') {
            return <RoleItem item={item as RoleItemType} />;
          }

          return <View />;
        }}
        resetRefresh={resetRefresh}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingBottom: Platform.OS !== 'web' ? 10 : 0,
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
